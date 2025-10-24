import React from "react";
import Question from "./Question";
import Results from "./Results";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext.jsx";

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
    restartQuiz, // Action to reset the whole state
  } = useQuiz();

  const navigate = useNavigate();

  // --- NEW HANDLER FOR QUITTING ---
  const handleQuitQuiz = () => {
    if (
      window.confirm(
        "Are you sure you want to quit the quiz? Your current progress will be lost."
      )
    ) {
      // 1. Reset the solo quiz state in the context (sets status to 'start')
      restartQuiz();
      // 2. Navigate back to the QuizPage (or home, depending on your routing)
      navigate("/quizpage");
    }
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
      <div className="text-center mt-8 text-xl text-gray-600">
        No quiz questions loaded.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Quiz Progress Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h1>
        <p className="text-xl font-semibold text-indigo-600">Score: {score}</p>

        {/* NEW: Quit Button in the header for easy access */}
        <button
          onClick={handleQuitQuiz}
          className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-150 text-sm"
        >
          Quit Quiz
        </button>
      </div>

      {/* Renders the current Question component */}
      <Question
        questionData={currentQuestion}
        selectedOption={selectedOption}
        isAnswerLocked={isAnswerLocked}
        onSelectOption={handleAnswerSelection}
      />

      {/* Navigation Button */}
      <div className="mt-10 text-right">
        <button
          onClick={goToNextQuestion}
          disabled={!isAnswerLocked}
          className={`px-8 py-3 font-semibold rounded-lg shadow-md transition duration-150 
            ${
              isAnswerLocked
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
        >
          {currentQuestionIndex < totalQuestions - 1
            ? "Next Question"
            : "View Results"}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
