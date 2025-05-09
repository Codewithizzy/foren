import { Keypair, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';

// Use devnet for testing, mainnet-beta for production
const SOLANA_NETWORK = process.env.SOLANA_NETWORK || 'devnet';
const RPC_ENDPOINT = process.env.RPC_ENDPOINT || `https://api.${SOLANA_NETWORK}.solana.com`;

class WalletService {
  private connection: Connection;

  constructor() {
    this.connection = new Connection(RPC_ENDPOINT, 'confirmed');
  }

  // Generate a new wallet keypair
  generateNewWallet(): { publicKey: string; privateKey: string } {
    const keypair = Keypair.generate();
    return {
      publicKey: keypair.publicKey.toString(),
      privateKey: bs58.encode(keypair.secretKey),
    };
  }

  // Get wallet from stored private key
  getWalletFromPrivateKey(privateKey: string): { publicKey: string; keypair: Keypair } {
    const secretKey = bs58.decode(privateKey);
    const keypair = Keypair.fromSecretKey(secretKey);
    return {
      publicKey: keypair.publicKey.toString(),
      keypair,
    };
  }

  // Airdrop SOL to a wallet (for devnet/testing only)
  async airdropToWallet(publicKey: string, amountInSol: number = 0.1): Promise<string> {
    if (SOLANA_NETWORK !== 'devnet') {
      throw new Error('Airdrop only available on devnet');
    }

    const publicKeyObj = new PublicKey(publicKey);
    const signature = await this.connection.requestAirdrop(
      publicKeyObj,
      amountInSol * LAMPORTS_PER_SOL
    );
    await this.connection.confirmTransaction(signature);
    return signature;
  }

  // Get wallet balance
  async getWalletBalance(publicKey: string): Promise<number> {
    const publicKeyObj = new PublicKey(publicKey);
    const balance = await this.connection.getBalance(publicKeyObj);
    return balance / LAMPORTS_PER_SOL;
  }
}

export default new WalletService();