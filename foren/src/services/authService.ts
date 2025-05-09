import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import walletService from './walletService';

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret';
const SALT_ROUNDS = 10;

// Temporary in-memory users store (for demo/testing purposes only)
const users: any[] = [];

class AuthService {
  async signUp(email: string, password: string): Promise<{ user: any; token: string }> {
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const newWallet = walletService.generateNewWallet();

    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      walletAddress: newWallet.publicKey,
      walletPrivateKey: newWallet.privateKey,
      isVerified: false,
      passwordResetToken: null,
    };

    users.push(user);

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '30d',
    });

    return { user, token };
  }

  async logIn(email: string, password: string): Promise<{ user: any; token: string }> {
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '30d',
    });

    return { user, token };
  }

  async forgotPassword(email: string): Promise<void> {
    const user = users.find(u => u.email === email);
    if (!user) return;

    const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    user.passwordResetToken = resetToken;

    await this.sendPasswordResetEmail(email, resetToken);
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    let userId: string;

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      userId = decoded.userId;
    } catch {
      throw new Error('Invalid or expired token');
    }

    const user = users.find(u => u.id === userId && u.passwordResetToken === token);
    if (!user) {
      throw new Error('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.password = hashedPassword;
    user.passwordResetToken = null;
  }

  private async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    console.log(`Password reset link for ${email}: https://yourapp.com/reset-password?token=${token}`);
  }
}

export default new AuthService();
