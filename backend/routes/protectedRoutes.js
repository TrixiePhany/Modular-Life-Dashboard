import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, (req, res) => {
  res.json({ message: 'Access granted to protected route', user: req.user })
})

router.get('/dashboard', protect, (req, res) => {
  res.json({
    success: true,
    message: `Welcome to your dashboard, ${req.user.username}`,
    user: req.user,
  });
});

export default router;
