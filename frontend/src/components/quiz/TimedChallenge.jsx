import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ClockIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Question from "./Question";
import Results from "./Results";
import { useQuiz } from "../../context/QuizContext.jsx";

const MIN_DURATION = 30;

const TimedChallenge = ({ durationSeconds, onQuit }) => {
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
    restartQuiz,
    submitQuiz,
  } = useQuiz();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(
    Math.max(durationSeconds ?? 0, MIN_DURATION)
  );
  const [expiredAutomatically, setExpiredAutomatically] = useState(false);
  const intervalRef = useRef(null);
  const hasSubmittedRef = useRef(false);

  const sanitizedDuration = useMemo(
    () => Math.max(durationSeconds ?? 0, MIN_DURATION),
    [durationSeconds]
  );

  const progress = useMemo(() => {
    if (!totalQuestions || totalQuestions === 0) return 0;
    return ((currentQuestionIndex + 1) / totalQuestions) * 100;
  }, [currentQuestionIndex, totalQuestions]);

  const formattedTime = useMemo(() => {
    const safeTimeLeft = Math.max(timeLeft, 0);
    const minutes = Math.floor(safeTimeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(safeTimeLeft % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  useEffect(() => {
    if (quizStatus === "active") {
      setTimeLeft(sanitizedDuration);
      setExpiredAutomatically(false);
      hasSubmittedRef.current = false;
    }
  }, [quizStatus, sanitizedDuration]);

  useEffect(() => {
    if (quizStatus !== "active") {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [quizStatus]);

  useEffect(() => {
    if (quizStatus !== "active") return;
    if (timeLeft > 0) return;
    if (hasSubmittedRef.current) return;

    hasSubmittedRef.current = true;
    setExpiredAutomatically(true);
    toast.error("Time is up! Submitting your progress.");
    submitQuiz();
  }, [quizStatus, timeLeft, submitQuiz]);

  const handleQuitQuiz = useCallback(() => {
    toast((t) => (
      <div className="flex flex-col items-center gap-4 p-2 text-center">
        <p className="font-semibold text-[var(--color-text)]">
          Quit the timed challenge?
          <br />
          <span className="text-sm font-normal text-muted">
            Your answers will be cleared.
          </span>
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              restartQuiz();
              if (typeof onQuit === "function") {
                onQuit();
              } else {
                navigate("/quiz");
              }
            }}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-theme-soft hover:shadow-theme-strong transition duration-150 text-sm"
          >
            Yes, Quit
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 bg-[var(--color-surface)] text-[var(--color-text)] font-semibold rounded-lg shadow-theme-soft hover:shadow-theme-strong transition duration-150 text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  }, [navigate, onQuit, restartQuiz]);

  const handleSubmitNow = useCallback(async () => {
    if (quizStatus !== "active" || hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    toast.loading("Submitting your answers...", { id: "timed-submit" });
    try {
      await submitQuiz();
      toast.success("Answers submitted.", { id: "timed-submit" });
    } catch (error) {
      toast.error("Unable to submit answers.", { id: "timed-submit" });
    }
  }, [quizStatus, submitQuiz]);

  if (quizStatus === "finished") {
    return (
      <Results
        score={score}
        totalQuestions={totalQuestions}
        onRestart={() => {
          setExpiredAutomatically(false);
          restartQuiz();
        }}
        onViewLeaderboard={() => navigate("/Competepage")}
        title="Timed Challenge Complete"
        contextMessage={
          expiredAutomatically
            ? "The clock hit zero, so we scored what you completed."
            : "Nice pacing! You wrapped up before time expired."
        }
        primaryActionText="Run Another Timed Quiz"
        secondaryActionText="View Competition"
      />
    );
  }

  if (quizStatus === "start") {
    return null;
  }

  if (!currentQuestion) {
    return (
      <div className="text-center mt-8 text-xl text-muted">
        No quiz questions loaded.
      </div>
    );
  }

  const timerTone =
    timeLeft <= 15
      ? "bg-red-500/15 text-red-400 border-red-500/45"
      : timeLeft <= 60
      ? "bg-amber-500/15 text-amber-500 border-amber-500/40"
      : "bg-emerald-500/15 text-emerald-500 border-emerald-500/35";

  return (
    <div className="space-y-6">
      <div className="glass-panel rounded-3xl p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Timed Challenge
          </p>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 w-full md:w-44">
            <div className="h-2 w-full rounded-full bg-[var(--color-surface)] overflow-hidden">
              <div
                className="h-full rounded-full bg-[var(--color-accent)] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm font-semibold text-muted">
              {Math.round(progress)}%
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${timerTone}`}
          >
            <ClockIcon className="h-4 w-4" />
            <span className="font-semibold tracking-wider">{formattedTime}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleSubmitNow}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full accent-button shadow-theme-soft hover:shadow-theme-strong transition font-semibold text-xs"
            >
              Finish
            </button>
            <button
              onClick={handleQuitQuiz}
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold hover:shadow-theme-soft transition text-xs"
            >
              Quit
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Content with Side Arrow Navigation */}
      <div className="relative">
        {/* Left Arrow - Previous Question */}
        <button
          onClick={() => {
            if (currentQuestionIndex > 0) {
              // Navigate to previous question (this would need a context method)
              // For now, we'll disable this as there's no "go back" in the context
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
          aria-label={currentQuestionIndex < totalQuestions - 1 ? "Next Question" : "Submit Answers"}
        >
          <ChevronRightIcon className="h-8 w-8" />
        </button>
      </div>
    </div>
  );
};

export default TimedChallenge;

