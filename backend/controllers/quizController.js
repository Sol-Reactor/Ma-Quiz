import pool from '../db.js';

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT q.*,
              COUNT(qs.id) as question_count,
              q.created_at,
              u.username as created_by_username
       FROM quizzes q
       LEFT JOIN questions qs ON q.id = qs.quiz_id
       LEFT JOIN users u ON q.created_by = u.id
       GROUP BY q.id, u.username
       ORDER BY q.created_at DESC`
    );

    res.json({ quizzes: result.rows });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error while fetching quizzes' });
  }
};

// Get a specific quiz by ID with questions
export const getQuizById = async (req, res) => {
  try {
    const { id } = req.params;

    // Get quiz details
    const quizResult = await pool.query(
      `SELECT q.*,q.created_at, 
      u.username as created_by_username
       FROM quizzes q
       LEFT JOIN users u ON q.created_by = u.id
       WHERE q.id = $1`,
      [id]
    );

    if (quizResult.rows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    const quiz = quizResult.rows[0];

    // Get questions for this quiz (including correct answers for immediate feedback)
    const questionsResult = await pool.query(
      `SELECT id, question_text, options, topic, question_order, explanation, correct_answer
       FROM questions
       WHERE quiz_id = $1
       ORDER BY question_order, id`,
      [id]
    );

    // Format questions for client
    const questions = questionsResult.rows.map(q => ({
      id: q.id,
      question: q.question_text,
      options: q.options, // Options array as stored
      topic: q.topic,
      explanation: q.explanation,
      correctAnswer: q.correct_answer,
    }));

    res.json({
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        topic: quiz.topic,
        explanation: quiz.explanation,
        created_by: quiz.created_by_username,
      },
      questions,
    });
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error while fetching quiz' });
  }
};

// Submit quiz answers and calculate score
export const submitQuiz = async (req, res) => {
  try {
    const { id: quizId } = req.params; // Get quizId from URL parameters
    const { answers } = req.body;
    const userId = req.user.id; // From auth middleware

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers array is required' });
    }

    // Get correct answers from database
    const questionsResult = await pool.query(
      'SELECT id, correct_answer FROM questions WHERE quiz_id = $1',
      [quizId]
    );

    if (questionsResult.rows.length === 0) {
      return res.status(404).json({ message: 'Quiz not found or has no questions' });
    }

    // Calculate score
    let score = 0;
    const questionAnswers = questionsResult.rows;

    answers.forEach((userAnswer) => {
      const question = questionAnswers.find(q => q.id === userAnswer.questionId);
      if (question && question.correct_answer === userAnswer.selectedOption) {
        score++;
      }
    });

    const totalQuestions = questionAnswers.length;

    // Save quiz result
    await pool.query(
      `INSERT INTO quiz_results (user_id, quiz_id, score, total_questions, answers)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, quizId, score, totalQuestions, JSON.stringify(answers)]
    );

    res.json({
      message: 'Quiz submitted successfully',
      score,
      totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Server error while submitting quiz' });
  }
};

// Get user's quiz results
export const getUserResults = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(
      `SELECT qr.id, qr.quiz_id, qr.score, qr.total_questions, qr.completed_at,
              q.title as quiz_title, q.topic
       FROM quiz_results qr
       JOIN quizzes q ON qr.quiz_id = q.id
       WHERE qr.user_id = $1
       ORDER BY qr.completed_at DESC`,
      [userId]
    );

    res.json({ results: result.rows });
  } catch (error) {
    console.error('Error fetching user results:', error);
    res.status(500).json({ message: 'Server error while fetching results' });
  }
};

