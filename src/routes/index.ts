import express from 'express';

const router = express.Router();

// Health check route
router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

export default router; 