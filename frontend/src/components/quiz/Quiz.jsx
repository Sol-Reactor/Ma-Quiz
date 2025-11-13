import Question from "./Question";
import Results from "./Results";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../context/QuizContext.jsx";
import toast from "react-hot-toast";

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
    <div className="space-y-8">
      {/* Quiz Progress Header */}
      <div className="glass-panel flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 rounded-3xl">
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
          {/* NEW: Quit Button in the header for easy access */}
          <button
            onClick={handleQuitQuiz}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-theme-soft hover:shadow-theme-strong transition duration-150 text-sm"
          >
            Quit Quiz
          </button>
        </div>
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
          className={`px-8 py-3 font-semibold rounded-full transition duration-150 
            ${
              isAnswerLocked
                ? "accent-button shadow-theme-soft hover:shadow-theme-strong"
                : "bg-[var(--color-surface)] text-muted cursor-not-allowed"
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
