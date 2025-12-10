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

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="glass-panel p-6 rounded-3xl space-y-6">
      {questionData.topic && (
        <p className="text-base md:text-lg font-semibold text-muted uppercase tracking-[0.18em]">
          Topic:{" "}
          <span className="text-[var(--color-text)]">{questionData.topic}</span>
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)]">
        {questionData.question}
      </h2>

      {/* Options with Circular Buttons */}
      <div className="space-y-4">
        {options.map((option, index) => {
          const isSelected = option === selectedOption;
          const isCorrect = option === questionData.correctAnswer;
          const label = optionLabels[index] || String.fromCharCode(65 + index);

          let buttonClasses = "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition duration-200 border-2";
          let containerClasses = "flex items-center gap-4 p-4 rounded-xl transition duration-200 border border-soft";

          if (isAnswerLocked) {
            if (isSelected) {
              if (isCorrect) {
                // Correct answer, selected
                buttonClasses += " bg-green-500 text-white border-green-600";
                containerClasses += " bg-green-500/10 border-green-500/40";
              } else {
                // Incorrect answer, selected
                buttonClasses += " bg-red-500 text-white border-red-600";
                containerClasses += " bg-red-500/10 border-red-500/40";
              }
            } else if (isCorrect) {
              // Correct answer, not selected
              buttonClasses += " bg-green-500 text-white border-green-600";
              containerClasses += " bg-green-500/10 border-green-500/40";
            } else {
              // Other options
              buttonClasses += " bg-[var(--color-surface)] text-muted border-soft opacity-50";
              containerClasses += " bg-transparent opacity-50";
            }
            containerClasses += " cursor-not-allowed";
          } else {
            // Apply interactive styles when active
            buttonClasses += " bg-[var(--color-surface)] text-[var(--color-text)] border-soft";
            containerClasses += " bg-[var(--color-surface)] hover:bg-[var(--color-card)] hover:border-[var(--color-accent)]/60 cursor-pointer shadow-theme-soft hover:shadow-theme-strong";
          }

          return (
            <div
              key={index}
              className={containerClasses}
              onClick={() => !isAnswerLocked && onSelectOption(option)}
            >
              <div className={buttonClasses}>
                {label}
              </div>
              <span className="text-base md:text-lg font-medium text-[var(--color-text)] flex-1">
                {option}
              </span>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswerLocked && questionData.explanation && (
        <div className="bg-[#5081b0] dark:bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Explanation
          </h3>
          <p className="text-white dark:text-gray-300 font-bold">
            {questionData.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default Question;
