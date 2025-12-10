import Question from "./Question";
import Results from "./Results";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext.jsx";
import toast from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

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
    <div className="space-y-6">
      {/* Quiz Progress Header */}
      <div className="glass-panel flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 rounded-3xl">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </h1>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-40 bg-[var(--color-surface)] rounded-full h-2.5 overflow-hidden shadow-theme-soft">
            <div
              className="bg-[var(--color-accent)] h-2.5 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              }}
            ></div>
          </div>
          <span className="text-sm font-semibold text-muted">
            {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
            Complete
          </span>
          {/* Quit Button */}
          <button
            onClick={handleQuitQuiz}
            className="px-3 py-1.5 bg-red-500 text-white font-semibold rounded-full shadow-theme-soft hover:shadow-theme-strong transition duration-150 text-xs"
          >
            Quit
          </button>
        </div>
      </div>

      {/* Quiz Content with Side Arrow Navigation */}
      <div className="relative">
        {/* Left Arrow - Previous Question */}
        <button
          onClick={() => {
            if (currentQuestionIndex > 0) {
              // Navigate to previous question behavior if implemented
            }
          }}
          disabled={currentQuestionIndex === 0}
          className={`absolute left-[-80px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition duration-200 border-2 ${
            currentQuestionIndex === 0
              ? "bg-[var(--color-surface)] text-muted cursor-not-allowed opacity-30 border-transparent"
              : "bg-green-100/50 text-green-600 border-green-200 hover:bg-green-100 hover:border-green-300 hover:scale-105 shadow-sm"
          }`}
          aria-label="Previous Question"
        >
          <ChevronLeftIcon className="h-8 w-8" />
        </button>

        {/* Renders the current Question component */}
        <Question
          questionData={currentQuestion}
          selectedOption={selectedOption}
          isAnswerLocked={isAnswerLocked}
          onSelectOption={handleAnswerSelection}
        />

        {/* Right Arrow - Next Question */}
        <button
          onClick={goToNextQuestion}
          disabled={!isAnswerLocked}
          className={`absolute right-[-80px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center transition duration-200 border-2 ${
            isAnswerLocked
              ? "bg-green-100/80 text-green-600 border-green-300 hover:bg-green-200 hover:border-green-400 hover:scale-105 shadow-md"
              : "bg-[var(--color-surface)] text-muted cursor-not-allowed opacity-30 border-transparent"
          }`}
          aria-label={currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "View Results"}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
}

export default Quiz;
