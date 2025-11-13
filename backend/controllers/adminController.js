import pool from '../db.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, topic, questions } = req.body;
    const userId = req.user.id;

    if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: 'Title and questions are required' });
    }

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // Insert quiz
      const quizResult = await client.query(
        'INSERT INTO quizzes (title, description, topic, created_by) VALUES ($1, $2, $3, $4) RETURNING id',
        [title, description || null, topic || null, userId]
      );

      const quizId = quizResult.rows[0].id;

      // Insert questions
      for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        if (!question.question || !question.options || !question.correctAnswer) {
          throw new Error(`Question ${i + 1} is missing required fields`);
        }

        await client.query(
          `INSERT INTO questions (quiz_id, question_text, options, correct_answer, topic, question_order)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            quizId,
            question.question,
            JSON.stringify(question.options),
            question.correctAnswer,
            question.topic || topic || null,
            i + 1,
          ]
        );
      }

      await client.query('COMMIT');

      res.status(201).json({
        message: 'Quiz created successfully',
        quizId,
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: error.message || 'Server error while creating quiz' });
  }
};

// Update a quiz
export const updateQuiz = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, topic } = req.body;

    const result = await pool.query(
      'UPDATE quizzes SET title = $1, description = $2, topic = $3 WHERE id = $4 RETURNING id, title, description, topic',
      [title, description, topic, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({
      message: 'Quiz updated successfully',
      quiz: result.rows[0],
    });
  } catch (error) {
    console.error('Error updating quiz:', error);
    res.status(500).json({ message: 'Server error while updating quiz' });
  }
};

// Delete a quiz
export const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query('DELETE FROM quizzes WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    res.json({ message: 'Quiz deleted successfully' });
  } catch (error) {
    console.error('Error deleting quiz:', error);
    res.status(500).json({ message: 'Server error while deleting quiz' });
  }
};

// Get all activities (quiz results, user activities)
export const getActivities = async (req, res) => {
  try {
    // Get recent quiz results
    const recentResults = await pool.query(`
      SELECT 
        qr.id,
        qr.user_id,
        qr.quiz_id,
        qr.score,
        qr.total_questions,
        qr.completed_at,
        u.username,
        q.title as quiz_title
      FROM quiz_results qr
      JOIN users u ON qr.user_id = u.id
      JOIN quizzes q ON qr.quiz_id = q.id
      ORDER BY qr.completed_at DESC
      LIMIT 50
    `);

    // Get quiz statistics
    const quizStats = await pool.query(`
      SELECT 
        q.id,
        q.title,
        COUNT(qr.id) as total_attempts,
        AVG(qr.score::float / qr.total_questions::float * 100) as average_score,
        COUNT(DISTINCT qr.user_id) as unique_users
      FROM quizzes q
      LEFT JOIN quiz_results qr ON q.id = qr.quiz_id
      GROUP BY q.id, q.title
      ORDER BY total_attempts DESC
    `);

    // Get user statistics
    const userStats = await pool.query(`
      SELECT 
        COUNT(DISTINCT u.id) as total_users,
        COUNT(DISTINCT CASE WHEN u.created_at > NOW() - INTERVAL '7 days' THEN u.id END) as new_users_7d,
        COUNT(DISTINCT qr.user_id) as active_users
      FROM users u
      LEFT JOIN quiz_results qr ON u.id = qr.user_id AND qr.completed_at > NOW() - INTERVAL '7 days'
    `);

    // Get recent users
    const recentUsers = await pool.query(`
      SELECT id, username, email, role, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 10
    `);

    res.json({
      recentResults: recentResults.rows,
      quizStats: quizStats.rows,
      userStats: userStats.rows[0],
      recentUsers: recentUsers.rows,
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ message: 'Server error while fetching activities' });
  }
};

// Get dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Total quizzes
    const totalQuizzes = await pool.query('SELECT COUNT(*) as count FROM quizzes');
    
    // Total users
    const totalUsers = await pool.query('SELECT COUNT(*) as count FROM users');
    
    // Total quiz attempts
    const totalAttempts = await pool.query('SELECT COUNT(*) as count FROM quiz_results');
    
    // Today's activities
    const todayActivities = await pool.query(`
      SELECT COUNT(*) as count 
      FROM quiz_results 
      WHERE DATE(completed_at) = CURRENT_DATE
    `);

    res.json({
      totalQuizzes: parseInt(totalQuizzes.rows[0].count),
      totalUsers: parseInt(totalUsers.rows[0].count),
      totalAttempts: parseInt(totalAttempts.rows[0].count),
      todayActivities: parseInt(todayActivities.rows[0].count),
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Server error while fetching dashboard stats' });
  }
};

