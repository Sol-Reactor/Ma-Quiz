import React, { useEffect, useState } from "react";

const Question = ({
  questionData,
  selectedOption,
  isAnswerLocked,
  onSelectOption,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  // Ensure options is an array
  const options = Array.isArray(questionData.options)
    ? questionData.options
    : [];

  const optionLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl space-y-4 sm:space-y-6">
      {questionData.topic && (
        <p className="text-sm sm:text-base font-semibold text-muted uppercase tracking-[0.15em] sm:tracking-[0.18em]">
          Topic:{" "}
          <span className="text-[var(--color-text)]">{questionData.topic}</span>
        </p>
      )}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-text)] leading-tight sm:leading-normal">
        {questionData.question}
      </h2>

      {/* Options with Circular Buttons */}
      <div className="space-y-3 sm:space-y-4">
        {options.map((option, index) => {
          const isSelected = option === selectedOption;
          const isCorrect = option === questionData.correctAnswer;
          const label = optionLabels[index] || String.fromCharCode(65 + index);

          // Base classes
          let buttonClasses = "flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-base sm:text-lg transition duration-200 border-2";
          let containerClasses = `flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition duration-200 border border-soft ${
            !isAnswerLocked ? 'active:scale-[0.98]' : ''
          }`;
          let textClasses = "text-sm sm:text-base md:text-lg font-medium text-[var(--color-text)] flex-1 break-words";

          if (isAnswerLocked) {
            if (isSelected) {
              if (isCorrect) {
                // Correct answer, selected
                buttonClasses += " bg-green-500 text-white border-green-600";
                containerClasses += " bg-green-500/10 border-green-500/40";
                textClasses += " font-semibold";
              } else {
                // Incorrect answer, selected
                buttonClasses += " bg-red-500 text-white border-red-600";
                containerClasses += " bg-red-500/10 border-red-500/40";
              }
            } else if (isCorrect) {
              // Correct answer, not selected
              buttonClasses += " bg-green-500 text-white border-green-600";
              containerClasses += " bg-green-500/10 border-green-500/40";
              textClasses += " font-semibold";
            } else {
              // Other options
              buttonClasses += " bg-[var(--color-surface)] text-muted border-soft opacity-50";
              containerClasses += " bg-transparent opacity-50";
            }
            containerClasses += " cursor-not-allowed";
          } else {
            // Apply interactive styles when active
            buttonClasses += isSelected 
              ? " bg-[var(--color-accent)] text-white border-[var(--color-accent)]"
              : " bg-[var(--color-surface)] text-[var(--color-text)] border-soft";
              
            containerClasses += isSelected
              ? " bg-[var(--color-accent)]/10 border-[var(--color-accent)]/60"
              : " bg-[var(--color-surface)] active:bg-[var(--color-card)] active:border-[var(--color-accent)]/60";
              
            containerClasses += " cursor-pointer shadow-theme-soft active:shadow-theme-strong";
          }

          return (
            <div
              key={index}
              className={containerClasses}
              onClick={() => !isAnswerLocked && onSelectOption(option)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => !isAnswerLocked && (e.key === 'Enter' || e.key === ' ') && onSelectOption(option)}
            >
              <div className={buttonClasses} aria-hidden="true">
                {label}
              </div>
              <span className={textClasses}>
                {option}
              </span>
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {isAnswerLocked && questionData.explanation && (
        <div className="bg-[#5081b0] dark:bg-gray-800 p-3 sm:p-4 rounded-lg animate-fade-in">
          <h3 className="text-base sm:text-lg font-bold text-white mb-2">
            Explanation
          </h3>
          <p className="text-white text-sm sm:text-base">
            {questionData.explanation}
          </p>
        </div>
      )}
      
      {/* Mobile hint for navigation */}
      {!isAnswerLocked && isMobile && (
        <p className="text-xs text-center text-muted mt-4">
          Tap an option to select your answer
        </p>
      )}
    </div>
  );
};

export default Question;
