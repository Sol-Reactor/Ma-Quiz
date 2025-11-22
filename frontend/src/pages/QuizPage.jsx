import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quiz from "../components/quiz/Quiz";
import TimedChallenge from "../components/quiz/TimedChallenge";
import { useQuiz } from "../context/QuizContext";
import { useAuthModal } from "../context/AuthModalContext";
import LoadingSpinner from "../components/common/LoadingSpinner";

const pageContainerClass =
  "min-h-[calc(100vh-64px)] bg-[var(--color-bg)] pt-20 pb-16 px-4 transition-colors";

const topicDescriptions = {
  "Frontend Fundamentals":
    "Component patterns, accessibility checks, and rendering strategies for modern UI builders.",
  "Backend Architectures":
    "Routing, persistence, scaling, and debugging scenarios drawn from production incidents.",
  "Data Structures Lab":
    "Time and space intuition across arrays, trees, graphs, and dynamic programming.",
  "DevOps Flow":
    "CI/CD pipelines, observability puzzles, and automation best practices in action.",
  "Security Essentials":
    "Threat modeling, auth hardening, and secure coding challenges to keep systems resilient.",
  "Cloud Native":
    "Container orchestration, multi-region deployment tactics, and performance under load.",
};

const curatedTopicPreview = [
  {
    title: "Frontend Fundamentals",
    description:
      "Polish UI instincts with quick-fire quizzes on accessibility, performance budgets, and component composition.",
    estimate: "12 questions • 15 minutes",
  },
  {
    title: "Data Structures Lab",
    description:
      "Sharpen algorithmic reflexes through visual drills and timed complexity challenges aligned to interviews.",
    estimate: "15 questions • 20 minutes",
  },
  {
    title: "DevOps Flow",
    description:
      "Simulate on-call incidents, interpret logs, and set up resilient deployment pipelines.",
    estimate: "10 questions • 18 minutes",
  },
];

function QuizPage() {
  const navigate = useNavigate();
  const { setIsModalOpen } = useAuthModal();
  const {
    quizStatus,
    quizQuestions,
    quizzes,
    currentQuiz,
    loading,
    error,
    startQuiz,
    selectQuiz,
    fetchQuizzes,
    restartQuiz,
  } = useQuiz();

  const [gameMode, setGameMode] = useState(null);
  const [showQuizSelection, setShowQuizSelection] = useState(false);
  const [timedSettings, setTimedSettings] = useState({ duration: 300 });

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  const handleModeSelect = (mode) => {
    if (mode === "compete") {
      navigate("/competepage");
      return;
    }
    setGameMode(mode);
    setShowQuizSelection(true);
  };

  const handleQuizSelect = async (quizId) => {
    const result = await selectQuiz(quizId);
    if (result.success) {
      setShowQuizSelection(false);
    }
  };

  const handleTimedStart = (duration) => {
    setTimedSettings({ duration });
    startQuiz();
  };

  const handleTimedQuit = () => {
    restartQuiz();
    setGameMode(null);
    setShowQuizSelection(false);
  };

  if (loading && quizzes.length === 0) {
    return (
      <div className={`${pageContainerClass} flex items-center justify-center`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error && quizzes.length === 0) {
    return (
      <div className={`${pageContainerClass} flex items-center justify-center`}>
        <div className="glass-panel rounded-3xl max-w-lg w-full p-8 text-center">
          <p className="text-lg font-semibold text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchQuizzes}
            className="px-6 py-3 accent-button rounded-full font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!gameMode) {
    return (
      <div className={`${pageContainerClass} flex items-center justify-center`}>
        <GameModeSelector onSelectMode={handleModeSelect} quizzes={quizzes} />
      </div>
    );
  }

  if (showQuizSelection) {
    return (
      <div className={`${pageContainerClass} flex items-center justify-center`}>
        <QuizSelector
          quizzes={quizzes}
          onSelectQuiz={handleQuizSelect}
          loading={loading}
          onBack={() => {
            setShowQuizSelection(false);
            setGameMode(null);
          }}
        />
      </div>
    );
  }

  if (quizQuestions.length === 0 && !loading) {
    return (
      <div className={`${pageContainerClass} flex items-center justify-center`}>
        <div className="glass-panel rounded-3xl max-w-lg w-full p-8 text-center">
          <p className="text-xl text-muted mb-4">
            Please select a quiz to continue.
          </p>
          <button
            onClick={() => setShowQuizSelection(true)}
            className="px-6 py-3 accent-button rounded-full font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
          >
            Select Quiz
          </button>
        </div>
      </div>
    );
  }

  if (gameMode === "solo") {
    if (quizStatus === "start") {
      return (
        <div
          className={`${pageContainerClass} flex items-center justify-center`}
        >
          <QuizStartupScreen
            quiz={currentQuiz}
            questionCount={quizQuestions.length}
            onStart={startQuiz}
            onBack={() => setShowQuizSelection(true)}
          />
        </div>
      );
    }

    return (
      <div className={`${pageContainerClass}`}>
        <div className="max-w-3xl mx-auto">
          <Quiz />
        </div>
      </div>
    );
  }

  if (gameMode === "timed") {
    if (quizStatus === "start") {
      return (
        <div
          className={`${pageContainerClass} flex items-center justify-center`}
        >
          <TimedQuizIntro
            quiz={currentQuiz}
            questionCount={quizQuestions.length}
            onStart={handleTimedStart}
            onBack={() => setShowQuizSelection(true)}
            initialDuration={timedSettings.duration}
          />
        </div>
      );
    }

    return (
      <div className={`${pageContainerClass}`}>
        <div className="max-w-3xl mx-auto">
          <TimedChallenge
            durationSeconds={timedSettings.duration}
            onQuit={handleTimedQuit}
          />
        </div>
      </div>
    );
  }

  return null;
}

export default QuizPage;

const GameModeSelector = ({ onSelectMode, quizzes }) => {
  const topTopics = (quizzes ?? [])
    .filter((quiz) => Boolean(quiz?.title))
    .slice(0, 4);

  const modes = [
    {
      key: "solo",
      title: "Solo Focus",
      emoji: "🧠",
      description:
        "Your entry point to every quiz topic. Browse the full library, set the vibe, and build streaks that stick.",
      accentClass: "from-[var(--color-accent)]/20 to-transparent",
      badge: "Entry to all topics",
    },
    {
      key: "timed",
      title: "Timed Sprint",
      emoji: "⏱️",
      description:
        "Set a countdown and see how much you can finish before the buzzer.",
      accentClass: "from-emerald-400/20 to-transparent",
      badge: "Auto submits on zero",
    },
    {
      key: "compete",
      title: "Competition",
      emoji: "🥇",
      description: "Climb the leaderboard and challenge the community.",
      accentClass: "from-amber-400/20 to-transparent",
      badge: "Climb live leaderboards",
    },
  ];

  return (
    <div className="max-w-6xl w-full space-y-12">
      <section className="glass-panel rounded-3xl p-10 md:p-12 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-xs font-semibold uppercase tracking-[0.28em] text-muted">
            Your quiz control center
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] leading-tight">
            Pick a mode, unlock a topic, and start your next streak.
          </h1>
          <p className="text-muted max-w-2xl">
            AuraQuiz curates the perfect flow whether you want calm focus, a
            timed rush, or full-on competitions. Solo Focus always unlocks the
            entire topic library so you can sample new playlists before
            sprinting.
          </p>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
              <span>
                Solo Focus exposes every playlist with descriptions and
                estimated time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span>
                Timed Sprint records your pace and auto-submits when the
                countdown hits zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span>
                Competition mode matches you with active learners in under 30
                seconds.
              </span>
            </li>
          </ul>
        </div>
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/20 via-transparent to-emerald-400/15 blur-2xl" />
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1100&q=85"
            alt="Learner strategizing a quiz challenge"
            className="relative z-10 rounded-3xl border border-soft shadow-theme-strong object-cover w-full h-full max-h-[420px]"
            loading="lazy"
          />
        </div>
      </section>

      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
          Choose your challenge mode
        </h2>
        <p className="text-muted mt-2">
          Every selection syncs to your streaks, progress tracker, and
          leaderboards.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modes.map((mode) => (
          <button
            key={mode.key}
            type="button"
            onClick={() => onSelectMode(mode.key)}
            className="relative text-left glass-panel rounded-3xl p-7 transition-transform hover:-translate-y-1 hover:shadow-theme-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)]"
          >
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${mode.accentClass} opacity-80 pointer-events-none`}
            />
            <div className="relative flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-4xl">{mode.emoji}</span>
                <span className="text-xs uppercase tracking-[0.35em] text-muted">
                  {mode.badge}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-text)]">
                  {mode.title}
                </h2>
                <p className="text-sm text-muted mt-2">{mode.description}</p>
              </div>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                {mode.key === "compete" ? "Open leaderboard" : "Start now"}
                <span aria-hidden="true">→</span>
              </span>
            </div>
          </button>
        ))}
      </div>

      <section className="glass-panel rounded-3xl p-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--color-text)]">
              Featured playlists waiting in Solo Focus
            </h2>
            <p className="text-muted max-w-2xl">
              These curated tracks refresh each week. You’ll see them—and many
              more—with descriptions and estimated runtimes as soon as you pick
              Solo Focus.
            </p>
          </div>
          <button
            onClick={() => onSelectMode("solo")}
            className="self-start md:self-center px-5 py-2 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
          >
            Enter Solo Focus
          </button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {curatedTopicPreview.map((topic) => (
            <div
              key={topic.title}
              className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition"
            >
              <h3 className="text-xl font-semibold text-[var(--color-text)]">
                {topic.title}
              </h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {topic.description}
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
                {topic.estimate}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
        <div className="glass-panel rounded-3xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            Why start with Solo Challenge?
          </h2>
          <p className="text-muted text-sm leading-relaxed">
            Solo Challenge playlists walk you through every quiz topic with
            quick primers, checkpoint questions, and end-of-track recaps. It’s
            the fastest way to sample the breadth of AuraQuiz before locking in
            your sprint or competition strategy.
          </p>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Unlock topic badges that carry over into timed sprints and
              competitions.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Bookmark tricky questions to revisit inside your personal review
              queue.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-[var(--color-accent)]" />
              Generate recap notes to share with friends or teammates after
              completing a playlist.
            </li>
          </ul>
        </div>
        <div className="glass-panel rounded-3xl p-8 space-y-5">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            Featured solo playlists
          </h3>
          {topTopics.length === 0 ? (
            <p className="text-sm text-muted">
              We’re loading featured topics. Check back after syncing quizzes.
            </p>
          ) : (
            <div className="space-y-4">
              {topTopics.map((quiz) => (
                <div
                  key={quiz.id ?? quiz.title}
                  className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4"
                >
                  <p className="font-semibold text-[var(--color-text)]">
                    {quiz.title}
                  </p>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted mt-1">
                    {quiz.topic || "General mastery"}
                  </p>
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {quiz.description ||
                      topicDescriptions[quiz.topic] ||
                      "Curated challenge playlist packed with mini-scenarios and wrap-up insights."}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <section className="glass-panel rounded-3xl p-10 space-y-4">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-muted">
            Top picks this week
          </p>
          <h3 className="text-2xl font-extrabold text-[var(--color-text)]">
            Preview the variety before you dive in.
          </h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {Object.keys(topicDescriptions).map((topic) => (
            <span
              key={topic}
              className="px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-sm font-semibold text-[var(--color-text)] shadow-theme-soft"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

const QuizSelector = ({ quizzes, onSelectQuiz, loading, onBack }) => {
  return (
    <div className="max-w-5xl w-full glass-panel p-10 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[var(--color-text)]">
            Select a Quiz
          </h1>
          <p className="text-muted mt-1">
            Choose a quiz topic to begin your challenge.
          </p>
        </div>
        <button
          onClick={onBack}
          className="self-start md:self-center px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft hover:shadow-theme-soft transition font-semibold"
        >
          ← Back
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-center text-muted py-8">No quizzes available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <button
              key={quiz.id}
              onClick={() => onSelectQuiz(quiz.id)}
              className="text-left bg-[var(--color-surface)] border border-soft rounded-3xl p-6 hover:border-[var(--color-accent)]/60 hover:shadow-theme-soft transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                {quiz.title}
              </h2>
              <p className="text-sm text-muted mb-4">
                {quiz.description ||
                  topicDescriptions[quiz.topic] ||
                  "A focused playlist of micro-challenges and recap notes to build momentum."}
              </p>
              <div className="flex items-center justify-between text-sm text-muted">
                <span className="px-3 py-1 rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold">
                  {quiz.topic || "General"}
                </span>
                <span>{quiz.question_count || 0} questions</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const QuizStartupScreen = ({ quiz, questionCount, onStart, onBack }) => {
  return (
    <div className="max-w-3xl w-full glass-panel p-10 rounded-3xl text-center">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1" />
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold hover:shadow-theme-soft transition"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl font-extrabold text-[var(--color-text)] mb-4">
        {quiz?.title || "Software Engineering Challenge"}
      </h1>
      {quiz?.description && (
        <p className="text-lg text-muted font-semibold mb-6">
          {quiz.description}
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-4 text-left text-sm bg-[var(--color-surface)] rounded-2xl p-6 border border-soft">
        <p className="font-semibold text-[var(--color-text)]">
          Total Questions:{" "}
          <span className="font-normal text-muted">{questionCount}</span>
        </p>
        {quiz?.topic && (
          <p className="font-semibold text-[var(--color-text)]">
            Topic: <span className="font-normal text-muted">{quiz.topic}</span>
          </p>
        )}
        <p className="md:col-span-2 text-muted">
          Instructions: Choose the best answer for each question. You will see
          your results once you submit.
        </p>
      </div>

      <button
        onClick={onStart}
        className="mt-8 w-full py-4 px-8 text-lg font-bold rounded-full accent-button shadow-theme-soft hover:shadow-theme-strong transition duration-200"
      >
        Get Started! 🚀
      </button>
    </div>
  );
};

const TimedQuizIntro = ({
  quiz,
  questionCount,
  onStart,
  onBack,
  initialDuration,
}) => {
  const [selectedDuration, setSelectedDuration] = useState(
    initialDuration || 300
  );

  const durationOptions = [
    { label: "2 minutes", value: 120 },
    { label: "5 minutes", value: 300 },
    { label: "10 minutes", value: 600 },
    { label: "15 minutes", value: 900 },
  ];

  return (
    <div className="max-w-3xl w-full glass-panel p-10 rounded-3xl text-center space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex-1" />
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold hover:shadow-theme-soft transition"
        >
          ← Back
        </button>
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-muted mb-2">
          Timed Sprint
        </p>
        <h1 className="text-4xl font-extrabold text-[var(--color-text)]">
          {quiz?.title || "Rapid Fire Practice"}
        </h1>
        {quiz?.description && (
          <p className="text-lg text-muted font-semibold mt-3">
            {quiz.description}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 text-left">
        <div className="bg-[var(--color-surface)] rounded-2xl p-5 border border-soft">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-[0.18em] mb-2">
            Duration
          </h3>
          <p className="text-lg font-bold text-[var(--color-text)]">
            {Math.floor(selectedDuration / 60)} min
          </p>
          <p className="text-sm text-muted mt-1">
            Timer will auto-submit once time is up.
          </p>
        </div>
        <div className="bg-[var(--color-surface)] rounded-2xl p-5 border border-soft">
          <h3 className="text-sm font-semibold text-muted uppercase tracking-[0.18em] mb-2">
            Questions
          </h3>
          <p className="text-lg font-bold text-[var(--color-text)]">
            {questionCount}
          </p>
          <p className="text-sm text-muted mt-1">
            Unanswered questions count as incorrect when time expires.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {durationOptions.map((option) => {
          const isActive = selectedDuration === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedDuration(option.value)}
              className={`px-4 py-2 rounded-full border font-semibold transition ${
                isActive
                  ? "accent-button shadow-theme-soft"
                  : "bg-[var(--color-surface)] text-[var(--color-text)] border-soft hover:shadow-theme-soft"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onStart(selectedDuration)}
        className="w-full py-4 px-8 text-lg font-bold rounded-full accent-button shadow-theme-soft hover:shadow-theme-strong transition duration-200"
      >
        Begin Countdown ⏱️
      </button>
    </div>
  );
};
