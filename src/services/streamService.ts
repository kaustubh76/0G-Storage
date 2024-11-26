import { Readable, Writable } from 'stream';
import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
import { env } from '../config/environment';
import { StorageError } from '../types/error';

export class StreamService {
  private indexer: Indexer;
  private signer: ethers.Wallet;

  constructor() {
    const provider = new ethers.JsonRpcProvider(env.EVM_RPC_URL);
    this.signer = new ethers.Wallet(env.PRIVATE_KEY, provider);
    this.indexer = new Indexer(env.INDEXER_RPC_URL);
  }

  async uploadStream(
    stream: Readable, 
    fileName: string
  ): Promise<string> {
    try {
      const tempFile = await ZgFile.fromReadable(stream, fileName);
      
      const [tx, uploadErr] = await this.indexer.upload(
        tempFile, 
        0, 
        env.EVM_RPC_URL, 
        this.signer, 
        env.FLOW_CONTRACT_ADDRESS
      );

      if (uploadErr) {
        throw new StorageError('Stream upload failed', uploadErr);
      }

      const [tree] = await tempFile.merkleTree();
      await tempFile.close();

      return tree.rootHash();
    } catch (error) {
      throw new StorageError('Unexpected stream upload error', error);
    }
  }

  async downloadStream(
    rootHash: string
  ): Promise<Readable> {
    try {
      const writeStream = new Writable();
      const downloadPromise = this.indexer.downloadStream(rootHash);

      return await downloadPromise;
    } catch (error) {
      throw new StorageError('Stream download failed', error);
    }
  }
}