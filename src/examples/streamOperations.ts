import { Readable } from 'stream';
import { StreamService } from '../services/streamService';
import { ErrorHandler } from '../utils/errorHandler';

async function exampleStreamOperations() {
  const streamService = new StreamService();

  await ErrorHandler.safeExecute(async () => {
    // Create a readable stream
    const readableStream = new Readable({
      read() {
        this.push('Hello, 0G Storage Stream!');
        this.push(null); // Signal end of stream
      }
    });

    // Upload stream
    const rootHash = await streamService.uploadStream(
      readableStream, 
      'example_stream.txt'
    );
    console.log('Stream uploaded with root hash:', rootHash);

    // Download stream
    const downloadStream = await streamService.downloadStream(rootHash);
    
    downloadStream.on('data', (chunk) => {
      console.log('Received chunk:', chunk.toString());
    });

    downloadStream.on('end', () => {
      console.log('Stream download complete');
    });
  });
}

exampleStreamOperations();