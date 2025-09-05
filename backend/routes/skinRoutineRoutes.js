import express from 'express';
import { getRoutine, saveRoutine } from '../controllers/skinRoutineController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getRoutine)
  .post(protect, saveRoutine);

export default router;
