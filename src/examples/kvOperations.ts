import { KvService } from '../services/kvService';
import { ErrorHandler } from '../utils/errorHandler';

async function exampleKvOperations() {
  const kvService = new KvService();

  await ErrorHandler.safeExecute(async () => {
    const streamId = '0x...'; // Your specific stream ID
    
    // Set a key-value pair
    await kvService.setValue(streamId, 'user_profile', JSON.stringify({
      name: 'John Doe',
      email: 'john@example.com'
    }));
    
    // Retrieve the value
    const retrievedValue = await kvService.getValue(streamId, 'user_profile');
    console.log('Retrieved Value:', retrievedValue);
  });
}

exampleKvOperations();