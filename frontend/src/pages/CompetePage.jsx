import React, { useState, useCallback, useMemo } from "react";
// Import questions from the new file
import { COMPETITION_QUESTIONS, MAX_QUESTIONS } from "./data/question"; // Adjust the path as needed

// --- HELPER FUNCTION ---

/**
 * Shuffles an array and returns a new array (Fisher-Yates)
 * @param {Array} array
 */
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- COMPONENT: Player Registration Form ---

const RegistrationForm = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState(Array(2).fill(""));

  const handleNumPlayersChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setNumPlayers(count);
    // Resize playerNames array, keeping existing names if possible
    setPlayerNames((prevNames) => {
      const newNames = Array(count).fill("");
      prevNames.forEach((name, index) => {
        if (index < count) newNames[index] = name;
      });
      return newNames;
    });
  };

  const handleNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. SHUFFLE THE ENTIRE QUESTION POOL
    const shuffledQuestions = shuffleArray(COMPETITION_QUESTIONS);

    // 2. Determine questions per player, rounding up to ensure all questions are used
    const questionsPerPlayer = Math.ceil(MAX_QUESTIONS / numPlayers);

    // 3. Filter out empty names and map to player objects
    const initialPlayers = playerNames
      .slice(0, numPlayers)
      .map((name, index) => {
        // 4. ASSIGN A UNIQUE, NON-OVERLAPPING SET OF QUESTIONS TO EACH PLAYER
        const startIndex = index * questionsPerPlayer;
        let endIndex = (index + 1) * questionsPerPlayer;

        // Ensure the last player gets any remaining questions
        if (index === numPlayers - 1) {
          endIndex = MAX_QUESTIONS;
        }

        const playerQuestions = shuffledQuestions.slice(startIndex, endIndex);

        return {
          id: index,
          name: name || `Player ${index + 1}`, // Default name if empty
          score: 0,
          questions: playerQuestions, // Store the unique questions for the player
          currentQuestionIndex: 0, // Track their progress
        };
      });

    onStartGame(initialPlayers);
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border-t-8 border-indigo-600">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
        Start a New Competition
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Number of Players Select */}
        <div>
          <label
            htmlFor="numPlayers"
            className="block text-lg font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Number of Competitors (2-4)
          </label>
          <select
            id="numPlayers"
            value={numPlayers}
            onChange={handleNumPlayersChange}
            className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          >
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </div>

        {/* Player Name Inputs */}
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white pt-2">
          Enter Names:
        </h3>
        {Array.from({ length: numPlayers }).map((_, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Name for Player ${index + 1}`}
            value={playerNames[index] || ""}
            onChange={(e) => handleNameChange(index, e.target.value)}
            className="w-full py-2 px-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        ))}

        {/* Start Button */}
        <button
          type="submit"
          className="w-full py-3 text-xl font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md mt-4"
        >
          Start Game
        </button>
      </form>
    </div>
  );
};

// --- COMPONENT: Game Board & Logic ---

const GameBoard = ({ initialPlayers, onEndGame }) => {
  // players state now holds players + their unique question lists
  const [players, setPlayers] = useState(initialPlayers);
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [message, setMessage] = useState("");

  // State to hold the index of the selected option for the current player
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);

  const currentPlayer = players[currentTurnIndex];
  // The current question is based on the player's unique list and their index
  const currentQuestion =
    currentPlayer.questions[currentPlayer.currentQuestionIndex];

  // Total questions is now the length of the current player's list
  const maxPlayerQuestions = currentPlayer.questions.length;

  // Game is over if all players have answered all their assigned questions
  const isGameOver = players.every(
    (p) => p.currentQuestionIndex >= p.questions.length
  );

  // Determine the winner dynamically
  const winner = useMemo(() => {
    if (!isGameOver) return null;
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    return sortedPlayers[0];
  }, [isGameOver, players]);

  // Handle user submission for the current question
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (isGameOver || selectedOptionIndex === null) return;

    const correctIndex = currentQuestion.correctAnswerIndex;

    // Scoring Logic
    if (selectedOptionIndex === correctIndex) {
      setMessage(`Correct! ${currentPlayer.name} earns 1 point.`);

      // Update score and move the player's question index
      setPlayers((prevPlayers) =>
        prevPlayers.map((p, index) =>
          index === currentTurnIndex
            ? {
                ...p,
                score: p.score + 1,
                currentQuestionIndex: p.currentQuestionIndex + 1,
              }
            : p
        )
      );
    } else {
      const correctAnswerText = currentQuestion.options[correctIndex];
      setMessage(`Incorrect. The correct answer was: ${correctAnswerText}`);

      // Still move the player's question index even if incorrect
      setPlayers((prevPlayers) =>
        prevPlayers.map((p, index) =>
          index === currentTurnIndex
            ? {
                ...p,
                currentQuestionIndex: p.currentQuestionIndex + 1,
              }
            : p
        )
      );
    }

    // Use a timeout to display the message before moving on
    setTimeout(() => {
      moveToNextTurn();
    }, 2000);
  };

  const moveToNextTurn = useCallback(() => {
    setMessage("");
    setSelectedOptionIndex(null); // Reset selected option

    // Find the next player who still has questions to answer
    let nextTurn = currentTurnIndex;
    let attempts = 0; // Prevent infinite loop

    do {
      nextTurn = (nextTurn + 1) % players.length;
      attempts++;
    } while (
      attempts < players.length &&
      players[nextTurn].currentQuestionIndex >=
        players[nextTurn].questions.length
    );

    setCurrentTurnIndex(nextTurn);
  }, [currentTurnIndex, players]);

  // Handle game over state
  if (isGameOver) {
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-red-600 max-w-lg mx-auto">
        <h2 className="text-4xl font-extrabold text-red-700 mb-4">
          Game Over!
        </h2>
        <h3 className="text-5xl font-black text-indigo-600 mb-6">
          🏆 {winner.name} WINS! 🏆
        </h3>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Final Score: {winner.score}
        </p>

        <ul className="space-y-2 mb-8 text-lg ">
          {[...players]
            .sort((a, b) => b.score - a.score)
            .map((p) => (
              <li
                key={p.id}
                className={`font-semibold ${
                  p.id === winner.id
                    ? "text-indigo-600 dark:text-indigo-600"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {p.name}: {p.score} points
              </li>
            ))}
        </ul>

        <button
          onClick={onEndGame} // Reset state to go back to registration
          className="w-full py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-150"
        >
          Start New Competition
        </button>
      </div>
    );
  }

  // Handle case where a player finishes their questions before the others
  if (!currentQuestion) {
    // This player has finished. We will move to the next player via `moveToNextTurn` logic.
    // We render a message while we transition.
    return (
      <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border-t-8 border-yellow-600 max-w-lg mx-auto">
        <h2 className="text-3xl font-extrabold text-yellow-700 mb-4">
          {currentPlayer.name} has finished their questions!
        </h2>
        <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
          Moving to the next competitor...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Scoreboard */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex justify-around border-b-4 border-gray-200 dark:border-gray-700">
        {players.map((p) => (
          <div
            key={p.id}
            className={`text-center p-2 rounded-lg transition duration-300 ${
              p.id === currentPlayer.id
                ? "bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500"
                : ""
            }`}
          >
            <p className="font-bold text-lg text-gray-800 dark:text-white">
              {p.name}
            </p>
            <p className="text-indigo-600 font-extrabold text-2xl">{p.score}</p>
          </div>
        ))}
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 border-indigo-500">
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Question {currentPlayer.currentQuestionIndex + 1} of{" "}
          {maxPlayerQuestions} (for {currentPlayer.name})
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </p>

        {/* Current Player Indicator */}
        <div className="p-3 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold rounded-lg mb-6 text-center">
          It's {currentPlayer.name}'s turn!
        </div>

        {/* Answer Message Feedback */}
        {message && (
          <div
            className={`p-3 text-center font-bold rounded-lg mb-4 ${
              message.includes("Correct")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        {/* Multiple Choice Options */}
        <form onSubmit={handleAnswerSubmit} className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              type="button" // Important: make it type="button" to prevent form submission
              onClick={() => setSelectedOptionIndex(index)}
              disabled={!!message}
              className={`w-full text-left py-3 px-4 rounded-lg border-2 font-medium transition duration-150 ${
                index === selectedOptionIndex && !message
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
              } ${
                message && index === currentQuestion.correctAnswerIndex
                  ? "border-green-500 bg-green-100 text-green-700" // Highlight correct answer after submission
                  : ""
              } ${
                message &&
                index === selectedOptionIndex &&
                index !== currentQuestion.correctAnswerIndex
                  ? "border-red-500 bg-red-100 text-red-700" // Highlight wrong selection
                  : ""
              } disabled:opacity-75`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!!message || selectedOptionIndex === null}
            className="w-full mt-6 py-3 text-lg font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition duration-150"
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

function CompetePage() {
  // State to store the players once the game starts
  const [players, setPlayers] = useState(null);

  const handleStartGame = (initialPlayers) => {
    setPlayers(initialPlayers);
  };

  const handleEndGame = () => {
    // Resets the page to the registration form
    setPlayers(null);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 dark:bg-gray-900 pt-20 pb-16 px-4 flex justify-center items-start">
      {players ? (
        // Show Game Board if players exist
        <GameBoard initialPlayers={players} onEndGame={handleEndGame} />
      ) : (
        // Show Registration Form initially
        <RegistrationForm onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default CompetePage;
