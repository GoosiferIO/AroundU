import { parse } from 'url';
import express from 'express';
import next from 'next';
import dotenv from 'dotenv';

dotenv.config();

const dev = (process.env.NODE_ENV || 'development') !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.all('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    return handle(req, res, parsedUrl);
  });

  server.listen(3000, '0.0.0.0', (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`> Ready on http://localhost:3000`);
  });

  server.on('error', (error) => {
    console.error('Server encountered an error:', error);
    process.exit(1);
  });
});
