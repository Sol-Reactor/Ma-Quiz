import { useState, useEffect } from "react";
import Question from "./Question";
import Results from "./Results";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext.jsx";
import toast from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import "../../styles/responsive.css";

function Quiz() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 1. Get ALL necessary state and actions from the context
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    quizStatus,
    selectedOption,
    isAnswerLocked,
    handleAnswerSelection,
    goToNextQuestion,
    goToPreviousQuestion,
    restartQuiz,
  } = useQuiz();

  const navigate = useNavigate();

  const handleQuitQuiz = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-2 text-center">
          <p className="font-semibold">
            Are you sure you want to quit?
            <br />
            <span className="text-sm font-normal text-gray-600">
              Your progress will be lost.
            </span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                restartQuiz();
                navigate("/quiz");
              }}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 text-sm"
            >
              Yes, Quit
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-150 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  // ------------------------------------

  // 2. Logic remains the same, but uses context data
  if (quizStatus === "finished") {
    return (
      <Results
        score={score}
        totalQuestions={totalQuestions}
        onRestart={restartQuiz} // Calls the context action
        onViewLeaderboard={() => navigate("/Competepage")}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center mt-8 text-xl text-muted">
        No quiz questions loaded.
      </div>
    );
  }

  return (
    <div className="quiz-container space-y-6 px-2 sm:px-4">
      {/* Quiz Progress Header */}
      <div className="glass-panel flex flex-col gap-3 p-4 sm:p-5 rounded-2xl sm:rounded-3xl">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text)]">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h1>
          <span className="text-sm sm:text-base font-semibold text-muted">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete
          </span>
        </div>
        
        <div className="w-full bg-[var(--color-surface)] rounded-full h-2.5 overflow-hidden shadow-theme-soft">
          <div
            className="bg-[var(--color-accent)] h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <button
            onClick={handleQuitQuiz}
            className="px-3 py-1.5 bg-red-500 text-white font-semibold rounded-full shadow-theme-soft hover:shadow-theme-strong transition duration-150 text-xs sm:text-sm"
          >
            Quit Quiz
          </button>
          <button
            onClick={restartQuiz}
            className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-surface)] text-[var(--color-text)] border border-soft rounded-full text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            <ArrowPathIcon className="h-3.5 w-3.5" />
            Restart
          </button>
        </div>
      </div>

      {/* Question Content */}
      <div className="question-container relative">
        <Question
          questionData={currentQuestion}
          selectedOption={selectedOption}
          isAnswerLocked={isAnswerLocked}
          onSelectOption={handleAnswerSelection}
        />
      </div>

      {/* Mobile Navigation Buttons */}
      {isMobile && (
        <div className="quiz-navigation">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center justify-center rounded-full p-3 transition-all ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
            }`}
            aria-label="Previous Question"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          
          <button
            onClick={goToNextQuestion}
            disabled={!isAnswerLocked}
            className={`flex items-center justify-center rounded-full p-3 transition-all ${
              isAnswerLocked
                ? 'bg-green-500 text-white hover:bg-green-600 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "View Results"}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Desktop Navigation Buttons */}
      {!isMobile && (
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
              currentQuestionIndex === 0
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : 'border-green-400 text-green-600 hover:bg-green-50 active:scale-95'
            }`}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={goToNextQuestion}
            disabled={!isAnswerLocked}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all ${
              isAnswerLocked
                ? 'bg-green-500 text-white border-green-500 hover:bg-green-600 hover:border-green-600 active:scale-95'
                : 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
            }`}
          >
            <span>{currentQuestionIndex < totalQuestions - 1 ? 'Next' : 'Finish'}</span>
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
