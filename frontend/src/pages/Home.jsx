import React from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import {
  highlightStats,
  featureTracks,
  learningTracks,
  testimonials,
  journeySteps,
  toolkitHighlights,
  communityHighlights,
} from "../assets/data/HomeContents.js";

function Home() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const handleStart = () => {
    if (isAuthenticated) {
      navigate("/quiz");
      return;
    }
    navigate("/signin");
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-[var(--color-bg)] pt-24 pb-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[var(--color-accent)]/25 blur-3xl" />
        <div className="absolute bottom-0 right-16 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 space-y-20">
        <section className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[var(--color-surface)] border border-soft text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] sm:tracking-[0.25em] text-muted">
              Study studio for doers
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Master Your Coding Skills with Fun Quizzes
            </h1>
            <p className="text-lg text-muted leading-relaxed max-w-xl">
              AuraQuiz blends adaptive solo practice, timed sprints, and
              community battles so you can build skills with momentum—not
              burnout.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleStart}
                className="px-6 py-3 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
              >
                Jump into a solo sprint
              </button>
              <button
                onClick={() => navigate("/competepage")}
                className="px-6 py-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold hover:shadow-theme-soft transition"
              >
                Browse live battles
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
              {highlightStats.map((metric) => (
                <div
                  key={metric.label}
                  className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4 sm:p-4 text-center shadow-theme-soft hover:shadow-theme-strong transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span className="block text-2xl sm:text-2xl font-extrabold text-[var(--color-text)]">
                    {metric.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-muted">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-2 -right-6 h-full w-full rounded-3xl bg-[var(--color-accent)]/20 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1551292831-023188e78222?auto=format&fit=crop&w=1100&q=85"
              alt="Learners collaborating on laptops in a bright studio"
              className="relative z-10 w-full rounded-3xl border border-soft shadow-theme-strong object-cover max-h-[480px]"
              loading="lazy"
            />
            <div className="absolute -bottom-20 mt-6 left-8 bg-[var(--color-nav)] border border-soft rounded-2xl shadow-theme-soft px-6 py-4 text-sm text-muted">
              🎯 Average completion rate increased by 48% for learners who use
              timed sprints twice a week.
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
                Practice modes that keep you inspired
              </h2>
              <p className="text-muted max-w-xl">
                Swap between solo, collaborative, and competitive flows without
                losing track of your progress. Each track is crafted with input
                from engineers, mentors, and educators.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Always evolving
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featureTracks.map((feature) => (
              <div
                key={feature.title}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span className="text-3xl" aria-hidden="true">
                  {feature.icon}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1.1fr] items-start">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Learning playlists
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
              Solo Challenge is your portal to every topic we offer.
            </h2>
            <p className="text-muted">
              Choose a focus area, scan the description, and dive in. Each
              playlist packs 10–15 micro challenges with quick wins, checkpoint
              quizzes, and a celebratory wrap-up when you finish.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {learningTracks.map((track) => (
              <div
                key={track.title}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  {track.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {track.blurb}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
                A three-step ritual for sharper instincts
              </h2>
              <p className="text-muted max-w-xl">
                From selecting a theme to capturing takeaways, AuraQuiz is
                intentionally designed to nudge you forward without overwhelm.
              </p>
            </div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Routine matters
            </span>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {journeySteps.map((step) => (
              <div
                key={step.step}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span className="text-xs uppercase tracking-[0.4em] text-muted">
                  {step.step}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-[var(--color-text)]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {step.blurb}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1fr_1fr] items-center">
          <div className="order-2 lg:order-1 grid gap-4 sm:grid-cols-2">
            {toolkitHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
          <div className="order-1 lg:order-2 space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Built around your routine
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--color-text)] leading-snug">
              The AuraQuiz toolkit travels with you—sync streaks everywhere you
              learn.
            </h2>
            <p className="text-muted">
              We integrate with the tools you already love so it’s effortless to
              capture insights, bookmark follow-ups, and share highlights with
              your crew.
            </p>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
              Trusted by ambitious learners
            </h2>
            <p className="text-muted">
              Hear how AuraQuiz helps students, career switchers, and seasoned
              engineers stay sharp.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((person) => (
              <div
                key={person.name}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 text-left shadow-theme-soft transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-theme-colorful"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="h-14 w-14 rounded-full object-cover border border-soft"
                  />
                  <div>
                    <p className="font-semibold text-[var(--color-text)]">
                      {person.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted">
                      {person.role}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {person.message}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
            Bring your curiosity—AuraQuiz powers the rest.
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            Pick a playlist, set a timer, and watch your streak build. Quiz
            sessions run on desktop and mobile so momentum travels with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleStart}
              className="px-6 py-3 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
            >
              Start practicing now
            </button>
            <button
              onClick={() => navigate("/about")}
              className="px-6 py-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold hover:shadow-theme-soft transition"
            >
              Learn how AuraQuiz works
            </button>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
                Community energy keeps practice exciting.
              </h2>
              <p className="text-muted">
                From accountability calls to live match commentary, AuraQuiz
                communities help you celebrate wins and troubleshoot roadblocks.
              </p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/competepage")}
                className="px-5 py-2 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
              >
                Join a live session
              </button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {communityHighlights.map((item) => (
              <div
                key={item.title}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition-transform duration-200 hover:-translate-y-1 hover:scale-[1.02]"
              >
                <h3 className="text-lg font-semibold text-[var(--color-text)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
