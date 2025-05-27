import express from 'express';
import authRoutes from './auth.routes';

const router = express.Router();

// Mount routes
router.use('/auth', authRoutes);

// Health check route
router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default router; 