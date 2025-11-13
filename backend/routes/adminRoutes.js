import express from 'express';
import { createQuiz, updateQuiz, deleteQuiz, getActivities, getDashboardStats } from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/admin.js';

const router = express.Router();

// All admin routes require authentication first, then admin check
router.post('/quizzes', authenticateToken, requireAdmin, createQuiz);
router.put('/quizzes/:id', authenticateToken, requireAdmin, updateQuiz);
router.delete('/quizzes/:id', authenticateToken, requireAdmin, deleteQuiz);
router.get('/activities', authenticateToken, requireAdmin, getActivities);
router.get('/stats', authenticateToken, requireAdmin, getDashboardStats);

export default router;

