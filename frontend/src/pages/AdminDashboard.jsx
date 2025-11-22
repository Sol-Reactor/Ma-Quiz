import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../services/api";
import LoadingSpinner from "../components/common/LoadingSpinner";

function AdminDashboard() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("stats");
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
      return;
    }
    loadData();
  }, [isAdmin, navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, activitiesData] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getActivities(),
      ]);
      setStats(statsData);
      setActivities(activitiesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage quizzes and view activities
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab("stats")}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "stats"
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                Statistics
              </button>
              <button
                onClick={() => setActiveTab("quizzes")}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "quizzes"
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                Create Quiz
              </button>
              <button
                onClick={() => setActiveTab("activities")}
                className={`px-6 py-4 text-sm font-medium border-b-2 ${
                  activeTab === "activities"
                    ? "border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500"
                }`}
              >
                Activities
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "stats" && <StatsTab stats={stats} />}
        {activeTab === "quizzes" && <CreateQuizTab onQuizCreated={loadData} />}
        {activeTab === "activities" && (
          <ActivitiesTab activities={activities} />
        )}
      </div>
    </div>
  );
}

// Stats Tab Component
const StatsTab = ({ stats }) => {
  if (!stats) return <div>Loading stats...</div>;

  const statCards = [
    { title: "Total Quizzes", value: stats.totalQuizzes, color: "bg-blue-500" },
    { title: "Total Users", value: stats.totalUsers, color: "bg-green-500" },
    {
      title: "Total Attempts",
      value: stats.totalAttempts,
      color: "bg-purple-500",
    },
    {
      title: "Today's Activities",
      value: stats.todayActivities,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <div
            className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
          >
            <span className="text-white text-2xl font-bold">{stat.value}</span>
          </div>
          <h3 className="text-gray-600 dark:text-gray-300 font-medium">
            {stat.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

// Create Quiz Tab Component
const CreateQuizTab = ({ onQuizCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    topic: "",
    questions: [
      { question: "", options: ["", "", "", ""], correctAnswer: "", topic: "" },
    ],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[index][field] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...formData.questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setFormData({ ...formData, questions: newQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [
        ...formData.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
          topic: "",
        },
      ],
    });
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Validate form
      if (!formData.title.trim()) {
        throw new Error("Quiz title is required");
      }
      if (formData.questions.length === 0) {
        throw new Error("At least one question is required");
      }

      // Validate questions
      for (let i = 0; i < formData.questions.length; i++) {
        const q = formData.questions[i];
        if (!q.question.trim()) {
          throw new Error(`Question ${i + 1} text is required`);
        }
        if (q.options.filter((opt) => opt.trim()).length < 2) {
          throw new Error(`Question ${i + 1} must have at least 2 options`);
        }
        if (!q.correctAnswer.trim()) {
          throw new Error(`Question ${i + 1} must have a correct answer`);
        }
        if (!q.options.includes(q.correctAnswer)) {
          throw new Error(
            `Question ${i + 1} correct answer must be one of the options`
          );
        }
      }

      const quizData = {
        title: formData.title,
        description: formData.description || null,
        topic: formData.topic || null,
        questions: formData.questions.map((q) => ({
          question: q.question,
          options: q.options.filter((opt) => opt.trim()),
          correctAnswer: q.correctAnswer,
          topic: q.topic || formData.topic || null,
        })),
      };

      await adminAPI.createQuiz(quizData);
      setSuccess("Quiz created successfully!");
      setFormData({
        title: "",
        description: "",
        topic: "",
        questions: [
          {
            question: "",
            options: ["", "", "", ""],
            correctAnswer: "",
            topic: "",
          },
        ],
      });
      if (onQuizCreated) onQuizCreated();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Create New Quiz
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Quiz Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Topic
            </label>
            <input
              type="text"
              name="topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Questions
            </h3>
            <button
              type="button"
              onClick={addQuestion}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Add Question
            </button>
          </div>

          {formData.questions.map((question, qIndex) => (
            <div
              key={qIndex}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  Question {qIndex + 1}
                </h4>
                {formData.questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Text *
                </label>
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "question", e.target.value)
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options *
                </label>
                {question.options.map((option, oIndex) => (
                  <input
                    key={oIndex}
                    type="text"
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(qIndex, oIndex, e.target.value)
                    }
                    placeholder={`Option ${oIndex + 1}`}
                    className="w-full mb-2 px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answer *
                </label>
                <select
                  value={question.correctAnswer}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctAnswer",
                      e.target.value
                    )
                  }
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Select correct answer</option>
                  {question.options
                    .filter((opt) => opt.trim())
                    .map((opt, index) => (
                      <option key={index} value={opt}>
                        {opt}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question Topic
                </label>
                <input
                  type="text"
                  value={question.topic}
                  onChange={(e) =>
                    handleQuestionChange(qIndex, "topic", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating Quiz..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

// Activities Tab Component
const ActivitiesTab = ({ activities }) => {
  if (!activities) return <div>Loading activities...</div>;

  return (
    <div className="space-y-6">
      {/* Quiz Statistics */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Quiz Statistics
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Quiz Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Total Attempts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Average Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Unique Users
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {activities.quizStats.map((quiz, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {quiz.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.total_attempts}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.average_score ? Math.round(quiz.average_score) : 0}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.unique_users}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Results */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Quiz Results
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Quiz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {activities.recentResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.username}
.
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.quiz_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.score}/{result.total_questions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(result.completed_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
