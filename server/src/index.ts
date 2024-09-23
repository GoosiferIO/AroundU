import express from 'express';
import mongo from '@/config/mongo';
import routes from '@/routes/routes';
import cors from 'cors';

const app = express();

const corsOptions = {
  origin: [`http://localhost:3000`],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

const startServer = async () => {
  try {
    await mongo.connect();

    app.use(routes);

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
