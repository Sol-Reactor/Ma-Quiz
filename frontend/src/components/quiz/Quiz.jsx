import React from "react";
import Question from "./Question";
import Results from "./Results";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext.jsx";
import toast from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import "../../styles/responsive.css";

function Quiz() {
  
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
    <div className="quiz-container space-y-6 px-2 sm:px-4 pb-20 md:pb-6">
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

      {/* Mobile Navigation Buttons - SUPER VISIBLE on mobile screens */}
      <div className="block md:hidden">
        {/* Hint text when next button becomes available */}
        {isAnswerLocked && (
          <div className="fixed bottom-32 left-4 right-4 z-[9998] text-center">
            <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce inline-block">
              <span className="text-sm font-bold">✓ Tap Next to Continue!</span>
            </div>
          </div>
        )}
        
        <div className="fixed bottom-6 left-4 right-4 z-[9999] bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl shadow-2xl border-2 border-blue-200 p-4">
          <div className="flex justify-between items-center">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center justify-center w-16 h-16 rounded-full font-bold text-xl transition-all border-4 ${
                currentQuestionIndex === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 border-gray-300'
                  : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-90 shadow-xl border-blue-800 hover:shadow-2xl'
              }`}
              aria-label="Previous Question"
            >
              <ChevronLeftIcon className="h-8 w-8 stroke-[3]" />
            </button>
            
            <div className="flex flex-col items-center px-6 py-2 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <span className="text-xs text-blue-600 uppercase tracking-wide font-bold">Question</span>
              <span className="text-2xl font-black text-gray-900">
                {currentQuestionIndex + 1} / {totalQuestions}
              </span>
            </div>
            
            <button
              onClick={goToNextQuestion}
              disabled={!isAnswerLocked}
              className={`flex items-center justify-center w-16 h-16 rounded-full font-bold text-xl transition-all border-4 ${
                isAnswerLocked
                  ? 'bg-green-600 text-white hover:bg-green-700 active:scale-90 shadow-xl border-green-800 hover:shadow-2xl animate-bounce'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-60 border-gray-300'
              }`}
              aria-label={currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "View Results"}
              style={isAnswerLocked ? {
                boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4)'
              } : {}}
            >
              <ChevronRightIcon className="h-8 w-8 stroke-[3]" />
              {isAnswerLocked && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation Buttons */}
      <div className="hidden md:flex justify-between items-center mt-6">
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
    </div>
  );
}

export default Quiz;
