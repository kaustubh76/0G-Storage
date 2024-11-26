import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  EVM_RPC_URL: z.string().url(),
  INDEXER_RPC_URL: z.string().url(),
  PRIVATE_KEY: z.string(),
  FLOW_CONTRACT_ADDRESS: z.string(),
  KV_CLIENT_URL: z.string().url()
});

export const env = envSchema.parse(process.env);
