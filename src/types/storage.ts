export interface FileUploadResult {
    rootHash: string;
    transactionHash?: string;
  }
  
  export interface StorageOptions {
    flowContractAddress?: string;
    withProof?: boolean;
  }
  