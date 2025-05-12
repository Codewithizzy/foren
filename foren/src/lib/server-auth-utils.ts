import { SolanaWalletData, generateWallet, encryptWallet, decryptWallet, signMessage } from './solana-wallet-utils';
import { toast } from '../components/ui/use-toast';

// In-memory storage for demo (would be a database in production)
const userStore: Record<string, {
  email: string,
  passwordHash: string,
  encryptedWallet: string
}> = {};

// Mock function to hash passwords (use proper hashing in production)
const hashPassword = (password: string): string => {
  return btoa(`hashed_${password}`); // NOT SECURE - just for demo
};

// Simulate API call to register user
export const registerWithServer = async (email: string, password: string): Promise<{ success: boolean, userId?: string }> => {
  try {
    // Check if user already exists
    if (userStore[email]) {
      toast({
        title: "Registration failed",
        description: "An account with this email already exists",
        variant: "destructive"
      });
      return { success: false };
    }

    // Create blockchain wallet for the user
    const wallet = generateWallet();
    
    // Encrypt wallet with user's password
    const encryptedWallet = encryptWallet(wallet, password);
    
    // Store user with encrypted wallet (in production, this would be in a database)
    userStore[email] = {
      email,
      passwordHash: hashPassword(password),
      encryptedWallet
    };
    
    toast({
      title: "Registration successful",
      description: "Your blockchain-secured account has been created"
    });
    
    // Log for demo purposes (remove in production)
    console.log('Created wallet with public key:', wallet.publicKey);
    
    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    toast({
      title: "Registration failed",
      description: "There was a problem creating your account",
      variant: "destructive"
    });
    return { success: false };
  }
};

// Authenticate with server
export const authenticateWithServer = async (email: string, password: string): Promise<{ success: boolean, userId?: string }> => {
  try {
    // Check if user exists
    const user = userStore[email];
    if (!user || user.passwordHash !== hashPassword(password)) {
      toast({
        title: "Authentication failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
      return { success: false };
    }

    // Decrypt the user's blockchain wallet
    const walletData = decryptWallet(user.encryptedWallet, password);
    
    // Generate authentication message
    const authMessage = `auth_${Date.now()}`;
    
    // Sign message with wallet to prove ownership
    const signature = signMessage(walletData, authMessage);
    
    // In production: Send signature to server to verify
    // For demo: We just log it
    console.log('Authenticated with blockchain signature:', signature.substring(0, 20) + '...');
    
    toast({
      title: "Authentication successful",
      description: "Securely logged in with blockchain verification",
    });
    
    return { success: true, userId: email };
  } catch (error) {
    console.error('Authentication error:', error);
    toast({
      title: "Authentication failed",
      description: "There was a problem verifying your credentials",
      variant: "destructive"
    });
    return { success: false };
  }
};

// Get user wallet data (would be an API call in production)
export const getUserWallet = async (userId: string, password: string): Promise<SolanaWalletData | null> => {
  try {
    const user = userStore[userId];
    if (!user) return null;
    
    return decryptWallet(user.encryptedWallet, password);
  } catch {
    return null;
  }
};