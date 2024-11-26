import { StorageService } from '../services/storageService';
import { ErrorHandler } from '../utils/errorHandler';

async function exampleFileDownload() {
  const storageService = new StorageService();

  await ErrorHandler.safeExecute(async () => {
    await storageService.downloadFile(
      'root_hash_from_previous_upload', 
      '/file.txt'
    );
    console.log('File downloaded successfully');
  });
}


exampleFileDownload();
