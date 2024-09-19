import express from 'express';
import mongo from '@/config/mongo';

const app = express();

app.use(express.json());

const startServer = async () => {
  try {
    await mongo.connect();

    app.listen(3001, () => {
      console.log('> Server running on http://localhost:3001');
    });
  } catch (error) {
    console.error(
      '> Failed to start the server due to MongoDB connection error:',
      error,
    );
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('> Received SIGINT, closing MongoDB connection...');
  await mongo.disconnect();
  process.exit(0);
});

startServer();
