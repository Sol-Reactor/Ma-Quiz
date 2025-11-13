import React from "react";

const Results = ({
  score,
  totalQuestions,
  onRestart,
  onViewLeaderboard,
  title = "Quiz Finished!",
  primaryActionText = "Try Another Quiz",
  secondaryActionText = "Go To Competition",
  contextMessage,
}) => {
  const percentage = totalQuestions
    ? Math.round((score / totalQuestions) * 100)
    : 0;
  const resultMessage =
    percentage >= 70
      ? "Excellent work! Keep coding."
      : "Great effort! Time to review some concepts.";

  return (
    <div className="relative overflow-hidden text-center p-10 glass-panel rounded-3xl">
      <div className="absolute -top-32 -right-24 h-56 w-56 rounded-full bg-[var(--color-accent)]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-[var(--color-accent)]/20 blur-3xl pointer-events-none" />

      <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] mb-4 relative">
        {title}
      </h2>
      <p className="text-5xl md:text-6xl font-black text-[var(--color-text)] mb-4 relative">
        {score}
        <span className="text-muted text-2xl font-semibold">/{totalQuestions}</span>
      </p>
      <p className="text-2xl text-[var(--color-accent)] mb-2 relative">
        {percentage}%
      </p>
      <p className="text-lg md:text-xl text-muted mb-6 relative">
        {resultMessage}
      </p>
      {contextMessage && (
        <p className="text-sm md:text-base text-muted/80 mb-6 relative">
          {contextMessage}
        </p>
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 relative">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-6 py-3 accent-button font-semibold rounded-full shadow-theme-soft hover:shadow-theme-strong transition duration-150"
        >
          {primaryActionText}
        </button>
        <button
          onClick={onViewLeaderboard}
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold shadow-theme-soft hover:shadow-theme-strong transition duration-150"
        >
          {secondaryActionText}
        </button>
      </div>
    </div>
  );
};

export default Results;
