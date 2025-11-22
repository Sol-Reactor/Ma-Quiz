import express from 'express';
import { getAllQuizzes, getQuizById, submitQuiz, getUserResults } from '../controllers/quizController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/quizzes', getAllQuizzes);
router.get('/quizzes/:id', getQuizById);

// Protected routes (require authentication)
router.post('/quizzes/:id/submit', authenticateToken, submitQuiz);
router.get('/results', authenticateToken, getUserResults);

export default router;