import React from "react";

const Results = ({ score, totalQuestions, onRestart, onViewLeaderboard }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  const resultMessage =
    percentage >= 70
      ? "Excellent work! Keep coding."
      : "Great effort! Time to review some concepts.";

  return (
    <div className="text-center p-8 bg-white rounded-xl shadow-lg border-t-4 border-indigo-500">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">
        Quiz Finished!
      </h2>
      <p className="text-6xl font-black text-gray-800 mb-6">
        {score}/{totalQuestions}
      </p>
      <p className="text-2xl text-gray-600 mb-2">{percentage}%</p>
      <p className="text-xl text-gray-700 mb-8">{resultMessage}</p>

      <div className="flex justify-center space-x-4">
        <button
          onClick={onRestart} // This calls the context's restartQuiz
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150"
        >
          Try Another Quiz
        </button>
        <button
          onClick={onViewLeaderboard}
          className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-150"
        >
          Go To Compitition
        </button>
      </div>
    </div>
  );
};

export default Results;
