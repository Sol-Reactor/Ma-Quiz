import { useNavigate } from "react-router-dom";
import image4 from "../assets/images/imag4.jpg";

const missionHighlights = [
  {
    title: "Practice that sticks",
    description:
      "Adaptive question banks keep every session fresh while reinforcing fundamentals you already know.",
  },
  {
    title: "Built for community",
    description:
      "Compete with friends, climb leaderboards, and celebrate wins with a supportive developer network.",
  },
  {
    title: "Career accelerating",
    description:
      "Interview-style challenges, real-world case studies, and insights from mentors keep you industry ready.",
  },
];

const growthMoments = [
  {
    year: "2023",
    label: "The spark",
    detail: "Launched our prototype to help classmates prep for finals.",
  },
  {
    year: "2024",
    label: "The community",
    detail: "Introduced competitions, streaks, and weekly coding clubs.",
  },
  {
    year: "2025",
    label: "The vision",
    detail:
      "Expanded to timed sprints, mentor feedback, and collaborative teams.",
  },
];

const studioValues = [
  {
    icon: "💡",
    title: "Curiosity First",
    description: "We design every challenge to reward exploration and insight.",
  },
  {
    icon: "⚡",
    title: "Momentum Matters",
    description:
      "Short, meaningful reps build real confidence. You always leave energized.",
  },
  {
    icon: "🤝",
    title: "Better Together",
    description:
      "Progress dashboards and pair modes make learning a shared experience.",
  },
];

const experienceHighlights = [
  {
    icon: "🧠",
    title: "Adaptive Knowledge Maps",
    description:
      "Solo runs unlock personalized follow-up questions so the next session always meets you where you are.",
  },
  {
    icon: "🎯",
    title: "Interview Playbooks",
    description:
      "Weekly case studies mirror real tech screens with rubric-based scoring and coach commentary.",
  },
  {
    icon: "🌍",
    title: "Global Study Rooms",
    description:
      "Drop into focus rooms, pomodoro co-working, or lightning battles with engineers across 32 countries.",
  },
];

const teamSpotlight = [
  {
    name: "Ruth Tesema",
    role: "Program Director",
    focus: "Curates the weekly curriculum and mentor rotations.",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Selam Abebe",
    role: "Lead Engineer",
    focus: "Builds the adaptive scoring engine and analytics pipelines.",
    avatar:
      "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Dawit Mengistu",
    role: "Community Architect",
    focus: "Hosts live retros, competitions, and accountability squads.",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-[var(--color-bg)] pt-28 pb-24 px-6 md:px-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/20 blur-3xl" />
        <div className="absolute top-64 -left-10 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto space-y-16">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Our Origin Story
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)] leading-tight">
              We transform curiosity into consistent wins for aspiring
              engineers.
            </h1>
            <p className="text-lg text-muted leading-relaxed">
              CodeQuest started as a friendly campus competition and evolved
              into a modern learning studio that blends gamified quizzes, timed
              sprints, and team challenges. We believe mastery feels
              collaborative, immersive, and fun.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {missionHighlights.map((item) => (
                <div
                  key={item.title}
                  className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4 shadow-theme-soft"
                >
                  <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-wide">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/quiz")}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
            >
              Explore challenges
              <span aria-hidden="true">→</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 h-full w-full rounded-3xl bg-[var(--color-accent)]/15 blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85"
              alt="Developers collaborating enthusiastically in a bright workspace"
              className="relative z-10 w-full h-full max-h-[420px] object-cover rounded-3xl shadow-theme-strong border border-soft"
              loading="lazy"
            />
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
                Our mission in motion
              </h2>
              <p className="text-muted mt-2 max-w-xl">
                Every feature we ship is designed to give you clarity, faster
                feedback, and peers to grow with. Here’s how we show up.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 min-w-0 w-full sm:min-w-[220px]">
              {[
                { label: "Learners coached", value: "12k+" },
                { label: "Questions crafted", value: "4.8k" },
                { label: "Weekly matches", value: "560" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4 text-center"
                >
                  <span className="block text-2xl font-extrabold text-[var(--color-text)]">
                    {metric.value}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-muted">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {studioValues.map((value) => (
              <div
                key={value.title}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition"
              >
                <span className="text-3xl" aria-hidden="true">
                  {value.icon}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              Why learners stay
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)] leading-snug">
              A studio experience that feels laser-focused on your next win.
            </h2>
            <p className="text-muted">
              Every week blends asynchronous practice with live touchpoints. We
              combine data-backed nudges, mentor Office Hours, and team quests
              so you never practice in a vacuum.
            </p>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]" />
                <span>
                  Weekly pulse reports summarise strengths, gaps, and suggested
                  playlists.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span>
                  Career mixers and AMA sessions connect you with alumni working
                  at top studios.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                <span>
                  Streak-safe reminders blend encouragement with custom
                  challenge suggestions when motivation dips.
                </span>
              </li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {experienceHighlights.map((highlight) => (
              <div
                key={highlight.title}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 shadow-theme-soft hover:shadow-theme-strong transition"
              >
                <span className="text-3xl" aria-hidden="true">
                  {highlight.icon}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                  {highlight.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-[0.7fr_1.3fr] items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-accent)]/25 to-transparent blur-3xl" />
            <img
              src={image4}
              alt="A developer presenting a project with confident energy"
              className="relative z-10 rounded-3xl shadow-theme-strong border border-soft object-cover w-full h-full max-h-[400px]"
              loading="lazy"
            />
          </div>
          <div className="order-1 md:order-2 space-y-6">
            <h2 className="text-3xl font-extrabold text-[var(--color-text)]">
              From spark to studio
            </h2>
            <p className="text-muted text-lg">
              We grew from late-night coding sessions into a fast-moving studio
              dedicated to helping every learner build momentum. This is the
              journey we’re proud of—and it is still unfolding with you.
            </p>
            <div className="space-y-4">
              {growthMoments.map((milestone) => (
                <div
                  key={milestone.year}
                  className="flex gap-4 items-start bg-[var(--color-surface)] border border-soft rounded-2xl p-4 shadow-theme-soft"
                >
                  <div className="px-3 py-2 rounded-xl bg-[var(--color-accent)]/15 text-[var(--color-accent)] font-semibold">
                    {milestone.year}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-muted">
                      {milestone.label}
                    </p>
                    <p className="text-sm text-muted mt-1">
                      {milestone.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 space-y-8" id="team">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)]">
              Guided by mentors who code, ship, and teach.
            </h2>
            <p className="text-muted max-w-3xl mx-auto">
              AuraQuiz mentors bring experience from startups, global tech
              companies, and community bootcamps. They design feedback that is
              kind, direct, and immediately actionable.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {teamSpotlight.map((member) => (
              <div
                key={member.name}
                className="bg-[var(--color-surface)] border border-soft rounded-2xl p-6 text-center shadow-theme-soft hover:shadow-theme-strong transition"
              >
                <div className="mx-auto h-24 w-24 rounded-full overflow-hidden border border-soft shadow-theme-soft">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-[var(--color-text)]">
                  {member.name}
                </h3>
                <p className="text-xs uppercase tracking-[0.35em] text-muted">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {member.focus}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-panel rounded-3xl p-10 text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-sm font-semibold uppercase tracking-[0.25em] text-muted">
            Ready to practice?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-text)]">
            Join weekly sprints, unlock achievements, and celebrate progress.
          </h2>
          <p className="text-muted max-w-3xl mx-auto">
            Whether you’re prepping for interviews or keeping your fundamentals
            sharp, CodeQuest gives you a lively environment to stay accountable
            and motivated.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/quiz")}
              className="px-6 py-3 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
            >
              Start your next quiz
            </button>
            <button
              onClick={() => navigate("/competepage")}
              className="px-6 py-3 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] border border-soft font-semibold hover:shadow-theme-soft transition"
            >
              Explore competitions
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
