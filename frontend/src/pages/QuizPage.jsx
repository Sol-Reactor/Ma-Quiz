import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 🎯 REQUIRED for navigation to /compete
import Quiz from "../components/quiz/Quiz";
import { useQuiz } from "../context/QuizContext";

function QuizPage() {
  const navigate = useNavigate();
  // Get all state and actions from the global context
  const { quizStatus, quizQuestions, startQuiz } = useQuiz();

  // 🎯 NEW STATE: Controls the mode selected by the user
  const [gameMode, setGameMode] = useState(null); // null, 'solo'

  // Handles the selection from the GameModeSelector component
  const handleModeSelect = (mode) => {
    if (mode === "compete") {
      // If Competition is chosen, navigate to the dedicated route
      navigate("/competepage");
    } else {
      // If Solo is chosen, set the mode state to proceed with the solo flow
      setGameMode("solo");
    }
  };

  // --- RENDERING LOGIC ---

  // 1. Show the Initial Game Mode Selector (if no mode is selected yet)
  if (!gameMode) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 pt-20 pb-16 px-4">
        <GameModeSelector onSelectMode={handleModeSelect} navigate={navigate} />
      </div>
    );
  }

  // Check for loading state (only relevant once a mode is chosen, though placed here for safety)
  if (quizQuestions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-64px)] p-4">
        <div className="text-center text-2xl text-gray-600">
          Loading quiz questions...
        </div>
      </div>
    );
  }

  // 2. If 'solo' mode is selected:
  if (gameMode === "solo") {
    // a. Show the Quiz Startup Screen (before 'Get Started' is clicked)
    if (quizStatus === "start") {
      return (
        <div className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50 pt-20 pb-16 px-4">
          <QuizStartupScreen
            questionCount={quizQuestions.length}
            onStart={startQuiz} // Calls the context action to set status to 'active'
          />
        </div>
      );
    }

    // b. Show the active Quiz UI
    return (
      <div className="min-h-[calc(100vh-64px)] bg-gray-50 pt-20 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Quiz />
        </div>
      </div>
    );
  }
}

export default QuizPage;

// ----------------------------------------------------------------------
// 🎯 NEW COMPONENT: Game Mode Selector
// ----------------------------------------------------------------------

const GameModeSelector = ({ onSelectMode }) => {
  return (
    <div className="max-w-xl w-full bg-white p-10 rounded-xl shadow-2xl text-center border-t-8 border-indigo-600">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Choose Your Challenge
      </h1>
      <p className="text-xl text-gray-600 font-semibold mb-8">
        Select a mode to begin your journey.
      </p>

      <div className="flex space-x-6 justify-center">
        {/* Solo Quiz Card */}
        <div
          className="flex-1 p-6 border-2 border-indigo-300 rounded-xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
          onClick={() => onSelectMode("solo")}
        >
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            Solo Challenge 👤
          </h2>
          <p className="text-gray-600 mb-4">
            Test your knowledge against the clock and yourself.
          </p>
          <button className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700">
            Start Solo Quiz
          </button>
        </div>

        {/* Competition Card */}
        <div
          className="flex-1 p-6 border-2 border-gray-300 rounded-xl shadow-lg hover:shadow-xl transition duration-200 cursor-pointer"
          onClick={() => onSelectMode("compete")}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Competition Mode 🥇
          </h2>
          <p className="text-gray-600 mb-4">
            Challenge your friends in a turn-based battle of wits.
          </p>
          <button className="w-full py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400">
            Go to Competition
          </button>
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------
// EXISTING COMPONENT: Quiz Startup Screen (Used for Solo Mode)
// ----------------------------------------------------------------------

const QuizStartupScreen = ({ questionCount, onStart }) => {
  return (
    <div className="max-w-xl w-full bg-white p-10 rounded-xl shadow-2xl text-center border-t-8 border-indigo-600">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Software Engineering Challenge
      </h1>
      <p className="text-xl text-indigo-600 font-semibold mb-6">
        Test your knowledge across core disciplines!
      </p>

      <hr className="my-6 border-gray-200" />

      <div className="space-y-4 text-left text-gray-700">
        <p className="text-lg">
          <span className="font-bold text-gray-900">Total Questions:</span>{" "}
          {questionCount}
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">Topics Covered:</span> OOP,
          Networking, Web Development, and more.
        </p>
        <p className="text-lg">
          <span className="font-bold text-gray-900">Instructions:</span> Choose
          the best answer for each question. You will receive instant feedback
          after each selection.
        </p>
      </div>

      <hr className="my-6 border-gray-200" />

      <button
        onClick={onStart}
        className="w-full py-4 px-8 text-xl font-bold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 shadow-lg transform hover:scale-[1.01]"
      >
        Get Started! 🚀
      </button>
    </div>
  );
};
