import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { env } from '../config/env';

/**
 * Creates Resend client if RESEND_API_KEY is provided.
 * Uses HTTPS (Port 443) which is never blocked by cloud hosts like Render.
 */
const resendClient = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

/**
 * Creates nodemailer transporter if SMTP configuration is provided.
 */
const getTransporter = () => {
  if (env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT) || 587,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }
  return null;
};

/**
 * Generate a random 6-digit numeric OTP.
 */
export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send an Email Verification OTP.
 */
export const sendVerificationEmail = async (email: string, otp: string, name: string): Promise<boolean> => {
  const subject = `Your ResumeIQ Verification Code: ${otp}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090d16; color: #f1f5f9; padding: 20px; margin: 0; }
        .container { max-width: 520px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .logo { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 24px; text-align: center; }
        .logo span { color: #6366f1; }
        .title { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
        .text { font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 24px; }
        .otp-box { background: #1e1b4b; border: 1px solid #4338ca; border-radius: 12px; padding: 18px; text-align: center; margin: 28px 0; }
        .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #818cf8; font-family: monospace; }
        .expiry { font-size: 12px; color: #cbd5e1; margin-top: 8px; }
        .footer { font-size: 12px; color: #64748b; text-align: center; margin-top: 32px; border-top: 1px solid #1e293b; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">Resume<span>IQ</span></div>
        <div class="title">Verify Your Email Address</div>
        <p class="text">Hi ${name || 'there'},</p>
        <p class="text">Thank you for registering with ResumeIQ. Please use the verification code below to confirm your account and start testing your resume against applicant tracking systems.</p>
        
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
          <div class="expiry">Expires in 10 minutes</div>
        </div>

        <p class="text" style="font-size: 12px; color: #64748b;">If you did not request this account, you can safely ignore this email.</p>
        <div class="footer">© ${new Date().getFullYear()} ResumeIQ. Zero-cost ATS optimization.</div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(email, subject, html, `Your ResumeIQ verification code is: ${otp}. It expires in 10 minutes.`);
};

/**
 * Send a Password Reset OTP.
 */
export const sendPasswordResetEmail = async (email: string, otp: string, name: string): Promise<boolean> => {
  const subject = `Reset Your ResumeIQ Password: ${otp}`;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090d16; color: #f1f5f9; padding: 20px; margin: 0; }
        .container { max-width: 520px; margin: 0 auto; background: #0f172a; border: 1px solid #1e293b; border-radius: 16px; padding: 32px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
        .logo { font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 24px; text-align: center; }
        .logo span { color: #6366f1; }
        .title { font-size: 20px; font-weight: 700; color: #ffffff; margin-bottom: 12px; }
        .text { font-size: 14px; line-height: 1.6; color: #94a3b8; margin-bottom: 24px; }
        .otp-box { background: #1e1b4b; border: 1px solid #4338ca; border-radius: 12px; padding: 18px; text-align: center; margin: 28px 0; }
        .otp-code { font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #818cf8; font-family: monospace; }
        .expiry { font-size: 12px; color: #cbd5e1; margin-top: 8px; }
        .footer { font-size: 12px; color: #64748b; text-align: center; margin-top: 32px; border-top: 1px solid #1e293b; padding-top: 16px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">Resume<span>IQ</span></div>
        <div class="title">Reset Your Password</div>
        <p class="text">Hi ${name || 'there'},</p>
        <p class="text">We received a request to reset your password. Enter the one-time code below to verify your identity and set a new password:</p>
        
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
          <div class="expiry">Expires in 10 minutes</div>
        </div>

        <p class="text" style="font-size: 12px; color: #ef4444;">If you did not request a password reset, someone may be trying to access your account. Please ignore this email.</p>
        <div class="footer">© ${new Date().getFullYear()} ResumeIQ. Security and Privacy Protected.</div>
      </div>
    </body>
    </html>
  `;

  return sendEmail(email, subject, html, `Your ResumeIQ password reset code is: ${otp}. It expires in 10 minutes.`);
};

/**
 * Internal sender function.
 */
const sendEmail = async (to: string, subject: string, html: string, text: string): Promise<boolean> => {
  const transporter = getTransporter();

  // Always log in development or when SMTP/Resend is not configured
  console.log(`\n======================================================`);
  console.log(`📧 [EMAIL NOTIFICATION] To: ${to}`);
  console.log(`📌 Subject: ${subject}`);
  console.log(`💬 Message: ${text}`);
  console.log(`======================================================\n`);

  // 1. Try Resend HTTP API first (port 443 - 100% works on Render & Cloud)
  if (resendClient) {
    try {
      const fromAddress = env.EMAIL_FROM && !env.EMAIL_FROM.includes('no-reply@resumeiq.com')
        ? env.EMAIL_FROM
        : 'ResumeIQ <onboarding@resend.dev>';

      const { data, error } = await resendClient.emails.send({
        from: fromAddress,
        to,
        subject,
        html,
        text,
      });

      if (error) {
        console.error(`❌ Resend API returned error for ${to}:`, error.message);
      } else {
        console.log(`✅ Email sent successfully via Resend API to ${to} (id: ${data?.id})`);
        return true;
      }
    } catch (resendErr) {
      console.error(`❌ Resend API request failed for ${to}:`, (resendErr as Error).message);
    }
  }

  // 2. Fall back to SMTP transporter if configured
  if (transporter) {
    try {
      await transporter.sendMail({
        from: env.EMAIL_FROM,
        to,
        subject,
        text,
        html,
      });
      console.log(`✅ Email sent successfully via SMTP to ${to}`);
      return true;
    } catch (error) {
      console.error(`❌ Failed to send email via SMTP to ${to}:`, (error as Error).message);
      return false;
    }
  }

  // If neither Resend nor SMTP is configured, local development log succeeded
  return true;
};
