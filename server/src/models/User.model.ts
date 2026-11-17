import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  refreshToken?: string | null;
  isVerified: boolean;
  otp?: string | null;
  otpExpires?: Date | null;
  otpType?: 'verification' | 'reset' | null;
  lastOtpSentAt?: Date | null;
  resetToken?: string | null;
  resetTokenExpires?: Date | null;
  createdAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    refreshToken: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    otpType: { type: String, enum: ['verification', 'reset', null], default: null },
    lastOtpSentAt: { type: Date, default: null },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// Never expose password or security tokens in JSON output
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const r = ret as unknown as Record<string, unknown>;
    delete r.password;
    delete r.refreshToken;
    delete r.otp;
    delete r.otpExpires;
    delete r.otpType;
    delete r.resetToken;
    delete r.resetTokenExpires;
    return ret;
  },
});

export const User = mongoose.model<IUser>('User', UserSchema);
