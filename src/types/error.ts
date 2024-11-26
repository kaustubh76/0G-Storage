
  export class StorageError extends Error {
    originalError?: any;
    code?: string;
  
    constructor(message: string, originalError?: any, code?: string) {
      super(message);
      this.name = 'StorageError';
      this.originalError = originalError;
      this.code = code;
    }
  }