import { MongoClient } from 'mongodb';

const mongoUrl =
  process.env.MONGO_URI || 'mongodb://aroundu-mongo:27017/aroundu_db';

let mongoClient: MongoClient | null = null;

const connect = async () => {
  try {
    if (!mongoClient) {
      mongoClient = new MongoClient(mongoUrl);
      await mongoClient.connect();
      console.log('> Connected to Local MongoDB Instance');
    }
  } catch (error) {
    console.error('> MongoDB connection failed', (error as Error).message);
    throw error;
  }
};

const disconnect = async () => {
  if (mongoClient) {
    await mongoClient.close();
    mongoClient = null;
    console.log('> MongoDB connection closed');
  }
};

const getClient = (): MongoClient => {
  if (!mongoClient) {
    throw new Error('MongoClient is not initialized. Call connect() first.');
  }
  return mongoClient;
};

export default {
  connect,
  disconnect,
  getClient,
};
