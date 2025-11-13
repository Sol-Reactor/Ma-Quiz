import image1 from "../images/photo_2025-09-30_22-40-48.jpg";
import image2 from "../images/photo_2025-10-05_22-45-30.jpg";
import image3 from "../images/photo_2025-10-29_08-36-53.jpg";

const highlightStats = [
  { label: "Daily learners", value: "3.2k" },
  { label: "Challenges completed", value: "87k" },
  { label: "Average streak", value: "6 days" },
];

const featureTracks = [
  {
    title: "Solo sprints",
    description:
      "Timed and untimed sessions that adapt to your skill level so you can focus on mastery.",
    icon: "⚡",
  },
  {
    title: "Guided paths",
    description:
      "Curated topic playlists cover data structures, APIs, algorithms, systems design, and more.",
    icon: "🧭",
  },
  {
    title: "Real-time battles",
    description:
      "Challenge a friend or instant-match with rivals worldwide, complete with leaderboards.",
    icon: "🥊",
  },
];

const learningTracks = [
  {
    title: "Frontend Fundamentals",
    blurb:
      "React rendering patterns, accessibility, and performance tuning in focused bursts.",
  },
  {
    title: "Backend Architectures",
    blurb:
      "Routing, persistence, and microservices scenarios drawn from production incidents.",
  },
  {
    title: "Data Structures Lab",
    blurb:
      "Algorithm drills and visualization quizzes that turn theory into intuition.",
  },
  {
    title: "DevOps Flow",
    blurb:
      "CI/CD pipelines, monitoring puzzles, and automation best practices in action.",
  },
];

const testimonials = [
  {
    name: "Sol Reactor",
    role: "Computer Science Student",
    message:
      "“AuraQuiz turned review sessions into something I actually look forward to. The streak reminders keep me honest.”",
    avatar: image2,
  },
  {
    name: "Michael Tesfaye",
    role: "Software Engineering Major",
    message:
      "“Timed sprints feel like mini-interviews. It’s the best prep I’ve had before internship rounds.”",
    avatar: image1,
  },
  {
    name: "Hana Berhane",
    role: "High School Maker",
    message:
      "“I pair with friends on Saturdays and we climb the leaderboard together. It’s ridiculous fun.”",
    avatar: image3,
  },
];

const journeySteps = [
  {
    step: "01",
    title: "Set your intention",
    blurb:
      "Pick a focus area, choose timed or chill mode, and set the vibe for your next streak.",
  },
  {
    step: "02",
    title: "Play through micro-challenges",
    blurb:
      "Each question adapts to the last answer so you’re always practicing at the edge of your comfort zone.",
  },
  {
    step: "03",
    title: "Review instant insights",
    blurb:
      "Deep-dive summaries, spaced repetition reminders, and shareable wins keep you moving.",
  },
];

const toolkitHighlights = [
  {
    title: "Browser & mobile ready",
    description:
      "AuraQuiz runs flawlessly on desktop, tablet, and phone—syncing streaks across every device.",
  },
  {
    title: "Integrates with your stack",
    description:
      "Connect Github, Notion, and Slack to receive nudge reminders, auto-log notes, and share progress.",
  },
  {
    title: "Mentor office hours",
    description:
      "Drop into weekly mentor lounges for breakdowns on tricky concepts or career chat advice.",
  },
  {
    title: "Community challenges",
    description:
      "Weekend hackathons and theme sprints keep competition friendly and fuel accountability.",
  },
];

const communityHighlights = [
  {
    title: "Study squads",
    description:
      "Join squads focused on front-end, backend, DevOps, or interview prep with rotating facilitators.",
  },
  {
    title: "Live match casting",
    description:
      "Watch top performers solve timed quizzes, narrate their approach, and field questions live.",
  },
  {
    title: "Resource vault",
    description:
      "Get templates, warmup exercises, and curated reading lists updated every Monday.",
  },
];
export {
  highlightStats,
  featureTracks,
  learningTracks,
  testimonials,
  journeySteps,
  toolkitHighlights,
  communityHighlights,
};