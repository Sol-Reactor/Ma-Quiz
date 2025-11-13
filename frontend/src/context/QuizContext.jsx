import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { quizAPI } from "../services/api";
import { useAuth } from "./AuthContext";

// 1. Create the Context
const QuizContext = createContext();

// 2. Custom Hook to consume the context
export const useQuiz = () => {
  return useContext(QuizContext);
};

// 3. The Provider Component (Contains all the logic and state)
export const QuizProvider = ({ children }) => {
  // --- STATE ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState("start"); // 'start', 'active', 'finished'
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  const { isAuthenticated } = useAuth();

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Fetch all available quizzes
  const fetchQuizzes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await quizAPI.getAllQuizzes();
      setQuizzes(response.quizzes || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching quizzes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch a specific quiz by ID
  const fetchQuizById = useCallback(async (quizId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await quizAPI.getQuizById(quizId);
      setCurrentQuiz(response.quiz);
      
      // Transform questions to match frontend format
      const formattedQuestions = response.questions.map((q) => ({
        id: q.id,
        question: q.question_text || q.question,
        options: Array.isArray(q.options) ? q.options : [],
        topic: q.topic || 'General',
      }));
      
      setQuizQuestions(formattedQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setUserAnswers([]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      console.error('Error fetching quiz:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Load quizzes on mount
  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  // --- ACTIONS ---

  const startQuiz = useCallback(() => {
    if (quizQuestions.length === 0) {
      setError('No questions available. Please select a quiz first.');
      return;
    }
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStatus("active");
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setUserAnswers([]);
    setError(null);
  }, [quizQuestions]);

  const handleAnswerSelection = useCallback(
    (option) => {
      if (isAnswerLocked || quizStatus !== "active") return;

      setSelectedOption(option);
      setIsAnswerLocked(true);

      // Store user's answer (replace if already answered this question)
      const answer = {
        questionId: currentQuestion.id,
        selectedOption: option,
      };
      setUserAnswers((prev) => {
        const filtered = prev.filter(a => a.questionId !== currentQuestion.id);
        return [...filtered, answer];
      });

      // Note: We don't know if it's correct until we submit to backend
      // For now, we'll just store the answer
    },
    [currentQuestion, isAnswerLocked, quizStatus]
  );

  const submitQuiz = useCallback(async () => {
    if (!currentQuiz || !isAuthenticated) {
      setError('You must be logged in to submit quiz results');
      setQuizStatus("finished");
      return;
    }

    try {
      setLoading(true);
      const response = await quizAPI.submitQuiz(currentQuiz.id, userAnswers);
      setScore(response.score);
      setQuizStatus("finished");
    } catch (err) {
      setError(err.message);
      console.error('Error submitting quiz:', err);
      setQuizStatus("finished");
    } finally {
      setLoading(false);
    }
  }, [currentQuiz, userAnswers, isAuthenticated]);

  const goToNextQuestion = useCallback(() => {
    if (!isAnswerLocked) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
    } else {
      // Submit quiz to backend when finished
      submitQuiz();
    }
  }, [currentQuestionIndex, totalQuestions, isAnswerLocked, submitQuiz]);

  const restartQuiz = useCallback(() => {
    // Resets the state entirely, returning to the start screen
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStatus("start");
    setSelectedOption(null);
    setIsAnswerLocked(false);
    setUserAnswers([]);
    setError(null);
  }, []);

  const selectQuiz = useCallback(async (quizId) => {
    const result = await fetchQuizById(quizId);
    if (result.success) {
      setQuizStatus("start");
    }
    return result;
  }, [fetchQuizById]);

  // --- Context Value ---
  const value = {
    // Data
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    quizStatus,
    selectedOption,
    isAnswerLocked,
    quizQuestions,
    quizzes,
    currentQuiz,
    loading,
    error,

    // Actions
    startQuiz,
    restartQuiz,
    handleAnswerSelection,
    goToNextQuestion,
    selectQuiz,
    fetchQuizzes,
    submitQuiz,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
