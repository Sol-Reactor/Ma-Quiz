import React from "react";

const Question = ({
  questionData,
  selectedOption,
  isAnswerLocked,
  onSelectOption,
}) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-indigo-500">
      <p className="text-xl font-semibold text-gray-700 mb-8">
        Topic: <span className="text-indigo-600">{questionData.topic}</span>
      </p>
      <h2 className="text-3xl font-bold text-gray-900 mb-10">
        {questionData.question}
      </h2>

      {/* Options Grid */}
      <div className="space-y-4">
        {questionData.options.map((option) => {
          const isSelected = option === selectedOption;
          const isCorrect = option === questionData.answer;

          let optionClasses =
            "p-4 border rounded-lg transition duration-150 text-lg font-medium ";

          if (isAnswerLocked) {
            // Apply feedback styles when locked
            if (isCorrect) {
              optionClasses +=
                "bg-green-100 border-green-500 text-green-700 shadow-lg cursor-not-allowed";
            } else if (isSelected) {
              optionClasses +=
                "bg-red-100 border-red-500 text-red-700 shadow-lg cursor-not-allowed";
            } else {
              optionClasses +=
                "bg-gray-50 border-gray-200 text-gray-500 cursor-not-allowed";
            }
          } else {
            // Apply interactive styles when active
            optionClasses +=
              "bg-gray-50 border-gray-300 hover:bg-indigo-50 hover:border-indigo-500 cursor-pointer";
          }

          return (
            <div
              key={option}
              className={optionClasses}
              onClick={() => onSelectOption(option)}
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
