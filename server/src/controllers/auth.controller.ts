import { Request, Response } from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.model';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokenHelper';
import { env } from '../config/env';
import { isDisposableEmail } from '../utils/disposableEmail';
import { generateOtp, sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service';

const isProduction = env.NODE_ENV === 'production';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ─── Register ────────────────────────────────────────────────────────────────
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'Name, email and password are required' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();

  // Reject disposable / temporary emails
  if (isDisposableEmail(cleanEmail)) {
    res.status(400).json({
      success: false,
      message: 'Temporary or disposable email addresses are not permitted. Please use a permanent email.',
    });
    return;
  }

  const existing = await User.findOne({ email: cleanEmail });

  // If user already exists and is verified
  if (existing && existing.isVerified) {
    res.status(409).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    return;
  }

  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  if (existing && !existing.isVerified) {
    // User started registration earlier but did not verify. Update details and resend code.
    existing.name = name.trim();
    existing.password = password; // pre-save hook will hash
    existing.otp = hashedOtp;
    existing.otpExpires = otpExpires;
    existing.otpType = 'verification';
    existing.lastOtpSentAt = new Date();
    await existing.save();

    await sendVerificationEmail(existing.email, otp, existing.name);

    res.status(200).json({
      success: true,
      requiresVerification: true,
      email: existing.email,
      message: 'Verification code sent to your email. Please verify to activate your account.',
    });
    return;
  }

  // Create new unverified user
  const user = new User({
    name: name.trim(),
    email: cleanEmail,
    password, // pre-save hook will hash
    isVerified: false,
    otp: hashedOtp,
    otpExpires,
    otpType: 'verification',
    lastOtpSentAt: new Date(),
  });

  await user.save();
  await sendVerificationEmail(user.email, otp, user.name);

  res.status(201).json({
    success: true,
    requiresVerification: true,
    email: user.email,
    message: 'Verification code sent to your email. Please verify to activate your account.',
  });
};

// ─── Verify Email ────────────────────────────────────────────────────────────
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ success: false, message: 'Email and verification code are required' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  if (!user) {
    res.status(404).json({ success: false, message: 'User not found' });
    return;
  }

  if (user.isVerified) {
    res.status(400).json({ success: false, message: 'Email is already verified. Please log in.' });
    return;
  }

  if (user.otpType !== 'verification' || !user.otp || !user.otpExpires) {
    res.status(400).json({ success: false, message: 'No pending verification code found. Please request a new code.' });
    return;
  }

  if (new Date() > user.otpExpires) {
    res.status(400).json({ success: false, message: 'Verification code has expired. Please request a new code.' });
    return;
  }

  const isMatch = await bcrypt.compare(otp.trim(), user.otp);
  if (!isMatch) {
    res.status(400).json({ success: false, message: 'Invalid verification code. Please check and try again.' });
    return;
  }

  // Mark verified and clear OTP
  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  user.otpType = null;

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.status(200).json({
    success: true,
    accessToken,
    user,
    message: 'Email verified successfully! Welcome to ResumeIQ.',
  });
};

// ─── Resend OTP ──────────────────────────────────────────────────────────────
export const resendOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, type = 'verification' } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: 'Email address is required' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  if (!user) {
    res.status(404).json({ success: false, message: 'User account not found' });
    return;
  }

  if (type === 'verification' && user.isVerified) {
    res.status(400).json({ success: false, message: 'Account is already verified. Please log in.' });
    return;
  }

  // Cooldown rate-limit: 60 seconds between resends
  if (user.lastOtpSentAt) {
    const elapsed = Date.now() - user.lastOtpSentAt.getTime();
    if (elapsed < 60 * 1000) {
      const waitSeconds = Math.ceil((60000 - elapsed) / 1000);
      res.status(429).json({
        success: false,
        message: `Please wait ${waitSeconds} seconds before requesting another code.`,
      });
      return;
    }
  }

  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = hashedOtp;
  user.otpExpires = otpExpires;
  user.otpType = type === 'reset' ? 'reset' : 'verification';
  user.lastOtpSentAt = new Date();
  await user.save();

  if (type === 'reset') {
    await sendPasswordResetEmail(user.email, otp, user.name);
  } else {
    await sendVerificationEmail(user.email, otp, user.name);
  }

  res.status(200).json({
    success: true,
    message: 'A new verification code has been sent to your email.',
  });
};

// ─── Forgot Password (Request Reset OTP) ─────────────────────────────────────
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: 'Email address is required' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  // For security, don't disclose whether email exists
  if (!user) {
    res.status(200).json({
      success: true,
      email: cleanEmail,
      message: 'If an account exists with this email, a password reset code has been sent.',
    });
    return;
  }

  if (!user.isVerified) {
    res.status(403).json({
      success: false,
      message: 'This account email has not been verified yet. Please complete verification first.',
    });
    return;
  }

  // Cooldown check (60 seconds)
  if (user.lastOtpSentAt) {
    const elapsed = Date.now() - user.lastOtpSentAt.getTime();
    if (elapsed < 60 * 1000) {
      const waitSeconds = Math.ceil((60000 - elapsed) / 1000);
      res.status(429).json({
        success: false,
        message: `Please wait ${waitSeconds} seconds before requesting another reset code.`,
      });
      return;
    }
  }

  const otp = generateOtp();
  const hashedOtp = await bcrypt.hash(otp, 10);
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

  user.otp = hashedOtp;
  user.otpExpires = otpExpires;
  user.otpType = 'reset';
  user.lastOtpSentAt = new Date();
  await user.save();

  await sendPasswordResetEmail(user.email, otp, user.name);

  res.status(200).json({
    success: true,
    email: user.email,
    message: 'A password reset code has been sent to your email.',
  });
};

// ─── Verify Reset OTP ────────────────────────────────────────────────────────
export const verifyResetOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ success: false, message: 'Email and verification code are required' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  if (!user || user.otpType !== 'reset' || !user.otp || !user.otpExpires) {
    res.status(400).json({ success: false, message: 'Invalid or expired password reset request. Please request a new code.' });
    return;
  }

  if (new Date() > user.otpExpires) {
    res.status(400).json({ success: false, message: 'Reset code has expired. Please request a new code.' });
    return;
  }

  const isMatch = await bcrypt.compare(otp.trim(), user.otp);
  if (!isMatch) {
    res.status(400).json({ success: false, message: 'Invalid verification code. Please check and try again.' });
    return;
  }

  // Generate secure temporary reset token
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetToken = resetToken;
  user.resetTokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins
  user.otp = null;
  user.otpExpires = null;
  user.otpType = null;
  await user.save();

  res.status(200).json({
    success: true,
    resetToken,
    message: 'Code verified successfully! You may now set your new password.',
  });
};

// ─── Reset Password ──────────────────────────────────────────────────────────
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email, resetToken, newPassword } = req.body;

  if (!email || !resetToken || !newPassword) {
    res.status(400).json({ success: false, message: 'Email, reset token and new password are required' });
    return;
  }

  if (newPassword.length < 6) {
    res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  if (
    !user ||
    !user.resetToken ||
    user.resetToken !== resetToken ||
    !user.resetTokenExpires ||
    new Date() > user.resetTokenExpires
  ) {
    res.status(400).json({ success: false, message: 'Reset session is invalid or has expired. Please request a new code.' });
    return;
  }

  // Update password (pre-save hook hashes it) and clear reset token
  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpires = null;
  user.refreshToken = null; // revoke any prior active sessions
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Your password has been reset successfully. Please log in with your new password.',
  });
};

// ─── Login ───────────────────────────────────────────────────────────────────
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  const cleanEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: cleanEmail });

  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
    return;
  }

  // Check email verification status
  if (!user.isVerified) {
    // Send a new verification code
    const otp = generateOtp();
    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    user.otpType = 'verification';
    user.lastOtpSentAt = new Date();
    await user.save();

    await sendVerificationEmail(user.email, otp, user.name);

    res.status(403).json({
      success: false,
      requiresVerification: true,
      email: user.email,
      message: 'Your email address is not verified yet. We have sent a verification code to your inbox.',
    });
    return;
  }

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.json({ success: true, accessToken, user });
};

// ─── Refresh Token ───────────────────────────────────────────────────────────
export const refresh = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken;

  if (!token) {
    res.status(401).json({ success: false, message: 'Refresh token not found' });
    return;
  }

  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.userId);

    if (!user || user.refreshToken !== token) {
      res.status(403).json({ success: false, message: 'Invalid refresh token' });
      return;
    }

    const newAccessToken = signAccessToken(user._id.toString());
    const newRefreshToken = signRefreshToken(user._id.toString());

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS);
    res.json({ success: true, accessToken: newAccessToken });
  } catch {
    res.status(403).json({ success: false, message: 'Expired or invalid refresh token' });
  }
};

// ─── Logout ──────────────────────────────────────────────────────────────────
export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.refreshToken;

  if (token) {
    await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
  });
  res.json({ success: true, message: 'Logged out successfully' });
};
