import { Router } from 'express';
import {
  register,
  verifyEmail,
  resendOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
  login,
  refresh,
  logout,
} from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/verify-reset-otp', verifyResetOtp);
router.post('/reset-password', resetPassword);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);

export default router;
