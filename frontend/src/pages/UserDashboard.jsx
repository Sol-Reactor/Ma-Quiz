import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { dashboardAPI } from "../services/api";
import { useQuiz } from "../context/QuizContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

function UserDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { selectQuiz } = useQuiz();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signup");
      return;
    }
    loadDashboard();
  }, [isAuthenticated, navigate]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await dashboardAPI.getUserDashboard();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSelect = async (quizId) => {
    await selectQuiz(quizId);
    navigate("/quiz");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">{error}</p>
          <button
            onClick={loadDashboard}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { stats, results, bestPerformance, availableQuizzes } = dashboardData;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Track your progress and performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-indigo-600 mb-2">
              {stats.total_quizzes_taken || 0}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Quizzes Taken
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.average_score ? Math.round(stats.average_score) : 0}%
            </div>
            <div className="text-gray-600">Average Score</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {stats.total_score || 0}/{stats.total_questions || 0}
            </div>
            <div className="text-gray-600">Total Score</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {availableQuizzes.length}
            </div>
            <div className="text-gray-600">Available Quizzes</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Best Performance */}
          {bestPerformance && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Best Performance
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Quiz:</span>{" "}
                  {bestPerformance.quiz_title}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Score:</span>{" "}
                  {bestPerformance.score}/{bestPerformance.total_questions}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Percentage:</span>{" "}
                  {bestPerformance.percentage}%
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(bestPerformance.completed_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            {stats.last_quiz_date ? (
              <p className="text-gray-600 dark:text-gray-300">
                Last quiz taken:{" "}
                {new Date(stats.last_quiz_date).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-gray-600 dark:text-gray-300">
                No quizzes taken yet
              </p>
            )}
          </div>
        </div>

        {/* Quiz Results */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quiz Results
          </h2>
          {results.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">
              No quiz results yet. Start taking quizzes!
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Quiz
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Percentage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {result.quiz_title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.score}/{result.total_questions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.percentage}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(result.completed_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Available Quizzes */}
        {availableQuizzes.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Available Quizzes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleQuizSelect(quiz.id)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {quiz.title}
                  </h3>
                  {quiz.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                      {quiz.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm">
                      {quiz.topic || "General"}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {quiz.question_count} questions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
