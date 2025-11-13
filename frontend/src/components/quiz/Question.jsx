import React from "react";

const Question = ({
  questionData,
  selectedOption,
  isAnswerLocked,
  onSelectOption,
}) => {
  // Ensure options is an array
  const options = Array.isArray(questionData.options)
    ? questionData.options
    : [];

  return (
    <div className="glass-panel p-8 rounded-3xl space-y-8">
      {questionData.topic && (
        <p className="text-base md:text-lg font-semibold text-muted uppercase tracking-[0.18em]">
          Topic:{" "}
          <span className="text-[var(--color-text)]">{questionData.topic}</span>
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
        {questionData.question}
      </h2>

      {/* Options Grid */}
      <div className="space-y-4">
        {options.map((option, index) => {
          const isSelected = option === selectedOption;

          let optionClasses =
            "p-4 border border-soft rounded-xl transition duration-200 text-base md:text-lg font-medium";

          if (isAnswerLocked) {
            // When locked, show selected state but don't reveal correct answer
            // (correct answer will be shown after quiz submission)
            if (isSelected) {
              optionClasses +=
                " bg-[var(--color-surface)] text-[var(--color-text)] border-[var(--color-accent)]/60 shadow-theme-soft cursor-not-allowed";
            } else {
              optionClasses +=
                " bg-transparent text-muted cursor-not-allowed opacity-70";
            }
          } else {
            // Apply interactive styles when active
            optionClasses +=
              " bg-[var(--color-surface)] text-[var(--color-text)] hover:bg-[var(--color-card)] hover:border-[var(--color-accent)]/60 cursor-pointer shadow-theme-soft hover:shadow-theme-strong";
          }

          return (
            <div
              key={index}
              className={optionClasses}
              onClick={() => !isAnswerLocked && onSelectOption(option)}
            >
              {option}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
