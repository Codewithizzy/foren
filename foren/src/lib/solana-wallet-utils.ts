import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import { decode } from 'bs58';
import { toast } from '../components/ui/use-toast';

// Constants for Solana
const SOLANA_NETWORK = 'devnet'; // Use 'mainnet-beta' for production
const SOLANA_ENDPOINT = `https://api.${SOLANA_NETWORK}.solana.com`;

// Interface for wallet data
export interface SolanaWalletData {
  publicKey: string;
  secretKey: string;
}

// Generate a new Solana wallet
export const generateWallet = (): SolanaWalletData => {
  try {
    const keypair = Keypair.generate();
    return {
      publicKey: keypair.publicKey.toString(),
      secretKey: Buffer.from(keypair.secretKey).toString('base64'),
    };
  } catch (error) {
    console.error('Error generating Solana wallet:', error);
    throw new Error('Failed to generate blockchain wallet');
  }
};

// Encrypt wallet data for storage
export const encryptWallet = (walletData: SolanaWalletData, password: string): string => {
  // In production, use a proper encryption library
  // This is a simplified version for demo purposes
  const data = JSON.stringify(walletData);
  // Simple XOR encryption with password (NOT SECURE - for demo only)
  return btoa(data); // Simple base64 encoding (NOT SECURE)
};

// Decrypt wallet data
export const decryptWallet = (encryptedData: string, password: string): SolanaWalletData => {
  // In production, use a proper decryption method
  try {
    const data = atob(encryptedData);
    return JSON.parse(data);
  } catch (error) {
    throw new Error('Invalid password or corrupted wallet data');
  }
};

// Create a Solana connection
export const getSolanaConnection = (): Connection => {
  return new Connection(SOLANA_ENDPOINT);
};

// Verify a wallet with the Solana network
export const verifyWalletOnNetwork = async (publicKeyStr: string): Promise<boolean> => {
  try {
    const connection = getSolanaConnection();
    const publicKey = new PublicKey(publicKeyStr);
    const accountInfo = await connection.getAccountInfo(publicKey);
    return accountInfo !== null;
  } catch (error) {
    console.error('Error verifying wallet:', error);
    return false;
  }
};

// Create keypair from stored secret
export const getKeypairFromSecret = (secret: string): Keypair => {
  try {
    // Convert base64 back to Uint8Array
    const secretKey = Uint8Array.from(Buffer.from(secret, 'base64'));
    return Keypair.fromSecretKey(secretKey);
  } catch (error) {
    console.error('Error creating keypair from secret:', error);
    throw new Error('Invalid wallet data');
  }
};

// Function to sign a message to prove ownership
export const signMessage = (walletData: SolanaWalletData, message: string): string => {
  try {
    const keypair = getKeypairFromSecret(walletData.secretKey);
    const messageBuffer = Buffer.from(message);
    const signature = keypair.sign(messageBuffer);
    return Buffer.from(signature).toString('base64');
  } catch (error) {
    console.error('Error signing message:', error);
    throw new Error('Failed to authenticate with blockchain wallet');
  }
};