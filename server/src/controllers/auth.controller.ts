import { Request, Response } from 'express';
import { User } from '../models/User.model';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/tokenHelper';
import { env } from '../config/env';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// ─── Register ────────────────────────────────────────────────────────────────
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ success: false, message: 'Name, email and password are required' });
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    res.status(409).json({ success: false, message: 'Email already in use' });
    return;
  }

  const user = await User.create({ name, email, password });

  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.status(201).json({ success: true, accessToken, user });
};

// ─── Login ───────────────────────────────────────────────────────────────────
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ success: false, message: 'Email and password are required' });
    return;
  }

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
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

  res.clearCookie('refreshToken', { httpOnly: true, secure: env.NODE_ENV === 'production' });
  res.json({ success: true, message: 'Logged out successfully' });
};
