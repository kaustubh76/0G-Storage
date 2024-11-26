import { Batcher, KvClient } from '@0glabs/0g-ts-sdk';
import { ethers } from 'ethers';
import { env } from '../config/environment';
import { StorageError } from '../types/errors';

export class KvService {
  private kvClient: KvClient;
  private signer: ethers.Wallet;
  private provider: ethers.Provider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(env.EVM_RPC_URL);
    this.signer = new ethers.Wallet(env.PRIVATE_KEY, this.provider);
    this.kvClient = new KvClient(env.KV_CLIENT_URL);
  }

  async setValue(
    streamId: string, 
    key: string, 
    value: string
  ): Promise<void> {
    try {
      const keyBytes = ethers.toUtf8Bytes(key);
      const valueBytes = ethers.toUtf8Bytes(value);

      const [nodes, nodesErr] = await this.kvClient.selectNodes(1);
      if (nodesErr) {
        throw new StorageError('Failed to select nodes', nodesErr);
      }

      const flowContract = getFlowContract(env.FLOW_CONTRACT_ADDRESS, this.signer);
      const batcher = new Batcher(1, nodes, flowContract, env.EVM_RPC_URL);

      batcher.streamDataBuilder.set(streamId, keyBytes, valueBytes);

      const [tx, batchErr] = await batcher.exec();
      if (batchErr) {
        throw new StorageError('KV value set failed', batchErr);
      }
    } catch (error) {
      throw new StorageError('Unexpected KV service error', error);
    }
  }

  async getValue(
    streamId: string, 
    key: string
  ): Promise<string | null> {
    try {
      const keyBytes = ethers.toUtf8Bytes(key);
      const encodedKey = ethers.encodeBase64(keyBytes);

      const value = await this.kvClient.getValue(streamId, encodedKey);
      return value ? ethers.toUtf8String(value) : null;
    } catch (error) {
      throw new StorageError('Failed to retrieve KV value', error);
    }
  }
}
