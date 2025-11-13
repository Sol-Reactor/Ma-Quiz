import pool from '../db.js';

// Get user dashboard data
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's quiz results
    const results = await pool.query(`
      SELECT 
        qr.id,
        qr.quiz_id,
        qr.score,
        qr.total_questions,
        qr.completed_at,
        q.title as quiz_title,
        q.topic,
        ROUND((qr.score::float / qr.total_questions::float * 100)::numeric, 2) as percentage
      FROM quiz_results qr
      JOIN quizzes q ON qr.quiz_id = q.id
      WHERE qr.user_id = $1
      ORDER BY qr.completed_at DESC
      LIMIT 20
    `, [userId]);

    // Get user statistics
    const stats = await pool.query(`
      SELECT 
        COUNT(qr.id) as total_quizzes_taken,
        SUM(qr.score) as total_score,
        SUM(qr.total_questions) as total_questions,
        AVG(qr.score::float / qr.total_questions::float * 100) as average_score,
        MAX(qr.completed_at) as last_quiz_date
      FROM quiz_results qr
      WHERE qr.user_id = $1
    `, [userId]);

    // Get user's best performance
    const bestPerformance = await pool.query(`
      SELECT 
        q.title as quiz_title,
        qr.score,
        qr.total_questions,
        ROUND((qr.score::float / qr.total_questions::float * 100)::numeric, 2) as percentage,
        qr.completed_at
      FROM quiz_results qr
      JOIN quizzes q ON qr.quiz_id = q.id
      WHERE qr.user_id = $1
      ORDER BY (qr.score::float / qr.total_questions::float) DESC
      LIMIT 1
    `, [userId]);

    // Get quizzes not taken yet
    const availableQuizzes = await pool.query(`
      SELECT 
        q.id,
        q.title,
        q.description,
        q.topic,
        COUNT(qs.id) as question_count
      FROM quizzes q
      LEFT JOIN questions qs ON q.id = qs.quiz_id
      WHERE q.id NOT IN (
        SELECT DISTINCT quiz_id FROM quiz_results WHERE user_id = $1
      )
      GROUP BY q.id
      ORDER BY q.created_at DESC
      LIMIT 10
    `, [userId]);

    res.json({
      results: results.rows,
      stats: stats.rows[0] || {
        total_quizzes_taken: 0,
        total_score: 0,
        total_questions: 0,
        average_score: 0,
        last_quiz_date: null,
      },
      bestPerformance: bestPerformance.rows[0] || null,
      availableQuizzes: availableQuizzes.rows,
    });
  } catch (error) {
    console.error('Error fetching user dashboard:', error);
    res.status(500).json({ message: 'Server error while fetching user dashboard' });
  }
};

