import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

const columnLinks = [
  {
    heading: "Product",
    links: [
      { label: "How it works", to: "/about" },
      { label: "Solo practice", to: "/quiz" },
      { label: "Competition hub", to: "/competepage" },
      { label: "Roadmap", to: "/about#roadmap" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Success stories", to: "/about#journey" },
      { label: "Guides", to: "/about#mission" },
      { label: "Support", to: "/support" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Community", to: "/competepage" },
      { label: "Press", to: "/press" },
    ],
  },
];

const socials = [
  { label: "Twitter", href: "https://twitter.com/", icon: FaTwitter },
  { label: "Instagram", href: "https://instagram.com/", icon: FaInstagram },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: FaLinkedin },
  { label: "GitHub", href: "https://github.com/", icon: FaGithub },
];

const programHighlights = [
  {
    label: "95% satisfaction",
    description:
      "Learners report AuraQuiz helps them stay consistently engaged.",
  },
  {
    label: "26k+ sessions",
    description: "Solo sprints completed this month across the globe.",
  },
  {
    label: "98 mentors",
    description: "Industry experts guiding streaks, challenges, and meetups.",
  },
];

function Footer() {
  return (
    <footer className="relative ">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/6 via-transparent to-emerald-400/10" />
      <div className="absolute inset-0 bg-[var(--color-nav)]/72 backdrop-blur-[40px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 space-y-16 text-[var(--color-text)]">
        <div className="glass-panel rounded-3xl p-10 md:p-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-soft text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Stay in the flow
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-snug">
              Weekly drops on new quiz topics, community battles, and study
              hacks—straight to your inbox.
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {programHighlights.map((highlight) => (
                <div
                  key={highlight.label}
                  className="bg-[var(--color-surface)] border border-soft rounded-2xl p-4 shadow-theme-soft"
                >
                  <p className="text-sm font-semibold text-[var(--color-accent)] uppercase tracking-[0.25em]">
                    {highlight.label}
                  </p>
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-full border border-soft bg-white/85 px-5 py-3 text-[var(--color-text)] shadow-theme-soft focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full accent-button font-semibold shadow-theme-soft hover:shadow-theme-strong transition"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs text-muted">
              We respect your inbox. Expect one meaningful update each week.
            </p>
          </form>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-2xl font-extrabold"
            >
              <span className="h-10 w-10 rounded-full bg-[var(--color-accent)]/20 border border-soft flex items-center justify-center font-bold text-[var(--color-accent)]">
                AQ
              </span>
              <span>AuraQuiz</span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              Designed for modern learners who crave momentum. Practice solo,
              meet rivals, and keep your engineering instincts sharp.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live match-making active now</span>
            </div>
          </div>

          {columnLinks.map((column) => (
            <div key={column.heading} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.32em] text-muted">
                {column.heading}
              </h3>
              <ul className="space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link className="text-muted hover:text-[var(--color-text)] font-medium transition">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-t border-soft pt-8">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} AuraQuiz Studio. Crafted with curiosity
            and caffeine.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <Link to="/privacy" className="hover:text-[var(--color-text)]">
              Privacy
            </Link>
            <span aria-hidden="true">•</span>
            <Link to="/terms" className="hover:text-[var(--color-text)]">
              Terms
            </Link>
            <span aria-hidden="true">•</span>
            <Link to="/cookies" className="hover:text-[var(--color-text)]">
              Cookies
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft bg-[var(--color-surface)] text-muted hover:text-[var(--color-accent)] hover:shadow-theme-soft transition"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
