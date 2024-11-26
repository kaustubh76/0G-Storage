import { StorageError } from '../types/error';

export class ErrorHandler {
  static handle(error: unknown): void {
    if (error instanceof StorageError) {
      console.error(`Storage Error: ${error.message}`);
      if (error.originalError) {
        console.error('Original Error:', error.originalError);
      }
    } else if (error instanceof Error) {
      console.error(`Unexpected Error: ${error.message}`);
    } else {
      console.error('Unknown error occurred', error);
    }
  }

  static async safeExecute<T>(
    fn: () => Promise<T>, 
    errorHandler?: (error: unknown) => void
  ): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      if (errorHandler) {
        errorHandler(error);
      } else {
        this.handle(error);
      }
      return null;
    }
  }
}
