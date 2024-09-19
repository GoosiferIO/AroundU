import express from 'express';

const app = express();

app.use(express.json());

app.listen(3001, () => {
  console.log(`> Ready on http://localhost:3001`);
});
