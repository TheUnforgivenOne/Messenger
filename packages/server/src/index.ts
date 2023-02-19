import * as dotenv from 'dotenv';
import dbConnect from './dbConnect';
import initalizeApp from './app';

// Inject dotenv configs
dotenv.config({ path: '.env.local' });
dotenv.config();

(async () => {
  try {
    await dbConnect();

    initalizeApp();
  } catch (err) {
    throw err;
  }
})();
