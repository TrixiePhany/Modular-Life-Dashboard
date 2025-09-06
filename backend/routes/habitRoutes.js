import express from 'express';
import { getHabits, createHabit, updateHabit, deleteHabit, toggleCompletion } from '../controllers/habitController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();


router.route('/')
  .get(protect, getHabits)
  .post(protect, createHabit);


router.route('/:id')
  .delete(protect, deleteHabit)
  .put(protect, updateHabit);

router.route('/:id/toggle')
  .put(protect, toggleCompletion)

export default router;