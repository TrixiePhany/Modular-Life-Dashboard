import express from 'express';
import { getAffirmations, createAffirmation, deleteAffirmation } from '../controllers/affirmationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getAffirmations)
  .post(protect, createAffirmation);

router.route('/:id')
  .delete(protect, deleteAffirmation);

export default router;
