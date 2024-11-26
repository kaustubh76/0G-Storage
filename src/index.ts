import { uploadFile, downloadFile } from './fileOperations';
import { uploadToKv, downloadFromKv } from './kvOperations';

(async () => {
  try {
    // Example: Upload a file
    await uploadFile('0g-storage/file.txt');

    // Example: Download a file
    await downloadFile('<root_hash>', './downloaded_file.txt');

    // Example: Upload data to 0g-kv
    await uploadToKv();

    // Example: Download data from 0g-kv
    await downloadFromKv('<stream_id>', '<key>');
  } catch (err) {
    console.error('Error occurred:', err);
  }
})();
