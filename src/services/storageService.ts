import { ZgFile, Indexer, getFlowContract } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
import { env } from '../config/environment';
import { StorageError } from '../types/errors';
import { FileUploadResult, StorageOptions } from '../types/storage';

export class StorageService {
  private indexer: Indexer;
  private signer: ethers.Wallet;
  private provider: ethers.Provider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(env.EVM_RPC_URL);
    this.signer = new ethers.Wallet(env.PRIVATE_KEY, this.provider);
    this.indexer = new Indexer(env.INDEXER_RPC_URL);
  }

  async uploadFile(
    filePath: string, 
    options: StorageOptions = {}
  ): Promise<FileUploadResult> {
    try {
      const file = await ZgFile.fromFilePath(filePath);
      const [tree, treeErr] = await file.merkleTree();
      
      if (treeErr) {
        throw new StorageError('Merkle tree generation failed', treeErr);
      }

      const flowContract = getFlowContract(
        options.flowContractAddress || env.FLOW_CONTRACT_ADDRESS, 
        this.signer
      );

      const [tx, uploadErr] = await this.indexer.upload(
        file, 
        0, 
        env.EVM_RPC_URL, 
        this.signer, 
        flowContract.target as string
      );

      if (uploadErr) {
        throw new StorageError('File upload failed', uploadErr);
      }

      await file.close();

      return {
        rootHash: tree.rootHash(),
        transactionHash: tx?.hash
      };
    } catch (error) {
      throw new StorageError('Unexpected file upload error', error);
    }
  }

  async downloadFile(
    rootHash: string, 
    outputPath: string,
    withProof = true
  ): Promise<void> {
    try {
      const err = await this.indexer.download(rootHash, outputPath, withProof);
      
      if (err) {
        throw new StorageError('File download failed', err);
      }
    } catch (error) {
      throw new StorageError('Unexpected file download error', error);
    }
  }
}
