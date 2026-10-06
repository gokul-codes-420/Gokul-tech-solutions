import mongoose from 'mongoose';
import { seedDatabase } from '../services/seedService.js';

let mongod = null;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    if (uri) {
      console.log(`[Database] Attempting connection to MONGO_URI...`);
      const conn = await mongoose.connect(uri);
      console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
      await seedDatabase();
      return;
    }
  } catch (error) {
    console.warn(`[Database] Remote/Local MONGO_URI connection failed: ${error.message}`);
    console.log(`[Database] Switching to embedded in-memory MongoDB fallback...`);
  }

  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    const conn = await mongoose.connect(memUri);
    console.log(`[Database] Connected to In-Memory MongoDB at ${memUri}`);
    console.log(`[Database] To use your own MongoDB, set MONGO_URI in backend/.env`);
    await seedDatabase();
  } catch (err) {
    console.error(`[Database] Failed to connect to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

export const closeDB = async () => {
  await mongoose.connection.close();
  if (mongod) {
    await mongod.stop();
  }
};
