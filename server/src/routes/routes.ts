import { Router } from 'express';
import eventsRoutes from './events';

const router = Router();

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'OK' });
});

router.use(eventsRoutes);

export default router;
