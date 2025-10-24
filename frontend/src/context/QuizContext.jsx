import { createContext, useContext, useState, useCallback } from "react";

// --- MOCK DATA (Consolidated here, move to a separate 'data' file if it grows) ---
const MOCK_QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which concept allows an object to take on many forms?",
    options: ["Inheritance", "Encapsulation", "Polymorphism", "Abstraction"],
    answer: "Polymorphism",
    topic: "OOP",
  },
  {
    id: 2,
    question: "What is the primary function of a DNS server?",
    options: [
      "Assigning IP addresses",
      "Translating domain names to IP addresses",
      "Routing packets",
      "Encrypting data",
    ],
    answer: "Translating domain names to IP addresses",
    topic: "Networking",
  },
  {
    id: 3,
    question: "Which of these is NOT a principle of RESTful API design?",
    options: [
      "Statelessness",
      "Client-Server separation",
      "Code-On-Demand",
      "Layered System",
    ],
    answer: "Code-On-Demand",
    topic: "Web Development",
  },
];
// --- END MOCK DATA ---

// 1. Create the Context
const QuizContext = createContext();

// 2. Custom Hook to consume the context
export const useQuiz = () => {
  return useContext(QuizContext);
};

// 3. The Provider Component (Contains all the logic and state)
export const QuizProvider = ({ children }) => {
  // --- STATE (from useQuizLogic) ---
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStatus, setQuizStatus] = useState("start"); // 'start', 'active', 'finished'
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState(MOCK_QUIZ_QUESTIONS); // Use MOCK_DATA here

  const totalQuestions = quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // --- ACTIONS (from useQuizLogic) ---

  const startQuiz = useCallback(() => {
    // Reset state and set status to active
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStatus("active");
    setSelectedOption(null);
    setIsAnswerLocked(false);
    // In a real app, you might fetch fresh quizQuestions here.
  }, []);
  
  const handleAnswerSelection = useCallback(
    (option) => {
      if (isAnswerLocked || quizStatus !== "active") return;

      setSelectedOption(option);
      setIsAnswerLocked(true);

      const isCorrect = option === currentQuestion.answer;
      if (isCorrect) {
        setScore((s) => s + 1);
      }
    },
    [currentQuestion, isAnswerLocked, quizStatus]
  );

  const goToNextQuestion = useCallback(() => {
    if (!isAnswerLocked) return;

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
      setIsAnswerLocked(false);
    } else {
      setQuizStatus("finished");
    }
  }, [currentQuestionIndex, totalQuestions, isAnswerLocked]);

  const restartQuiz = useCallback(() => {
    // Resets the state entirely, returning to the start screen
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizStatus("start"); // Go back to the initial start screen
    setSelectedOption(null);
    setIsAnswerLocked(false);
  }, []);

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
    
    // Actions
    startQuiz,
    restartQuiz,
    handleAnswerSelection,
    goToNextQuestion,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};