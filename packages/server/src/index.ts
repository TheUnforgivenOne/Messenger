import * as dotenv from 'dotenv';
import dbConnect from './dbConnect';
import initalizeApp from './app';

dotenv.config();

(async () => {
  try {
    await dbConnect();

    initalizeApp();
  } catch (err) {
    throw err;
  }
})();
