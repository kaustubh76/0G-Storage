import { StorageService } from '../services/storageService';
import { ErrorHandler } from '../utils/errorHandler';

async function exampleFileUpload() {
  const storageService = new StorageService();

  await ErrorHandler.safeExecute(async () => {
    const result = await storageService.uploadFile('/path/to/your/file.txt');
    console.log('File uploaded successfully:', result);
  });
}
