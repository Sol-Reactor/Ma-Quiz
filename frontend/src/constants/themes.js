export const defaultThemeKey = "lumenGlow";

export const themePresets = {
  lumenGlow: {
    label: "Lumen Glow",
    description: "Bright whites with soft violet accents for daytime focus.",
    mode: "light",
    cssVars: {
      "--color-bg": "#f5f7ff",
      "--color-surface": "#eef2ff",
      "--color-card": "rgba(255, 255, 255, 0.82)",
      "--color-nav": "rgba(255, 255, 255, 0.86)",
      "--color-nav-text": "#111827",
      "--color-text": "#0b1220",
      "--color-text-muted": "#4b5563",
      "--color-accent": "#6366f1",
      "--color-accent-hover": "#4f46e5",
      "--color-accent-contrast": "#f9fafb",
      "--color-border": "rgba(99, 102, 241, 0.18)",
      "--color-ring": "rgba(99, 102, 241, 0.35)",
      "--gradient-hero":
        "linear-gradient(135deg, rgba(238, 242, 255, 1) 0%, rgba(224, 242, 254, 1) 100%)",
      "--shadow-soft": "0 24px 45px -28px rgba(15, 23, 42, 0.35)",
      "--shadow-strong": "0 35px 65px -28px rgba(88, 28, 135, 0.45)",
      "--backdrop-blur": "blur(20px)",
    },
  },
  midnightPulse: {
    label: "Midnight Pulse",
    description:
      "Moody indigo base with neon cyan pulses for late-night problem solvers.",
    mode: "dark",
    cssVars: {
      "--color-bg": "#050b18",
      "--color-surface": "#0f172a",
      "--color-card": "rgba(11, 22, 43, 0.78)",
      "--color-nav": "rgba(9, 16, 32, 0.84)",
      "--color-nav-text": "#f8fafc",
      "--color-text": "#f1f5f9",
      "--color-text-muted": "#94a3b8",
      "--color-accent": "#22d3ee",
      "--color-accent-hover": "#0ea5e9",
      "--color-accent-contrast": "#052f4d",
      "--color-border": "rgba(34, 211, 238, 0.22)",
      "--color-ring": "rgba(14, 165, 233, 0.38)",
      "--gradient-hero":
        "linear-gradient(140deg, rgba(8, 47, 73, 1) 0%, rgba(15, 23, 42, 1) 60%, rgba(76, 29, 149, 1) 100%)",
      "--shadow-soft": "0 28px 60px -32px rgba(14, 116, 144, 0.48)",
      "--shadow-strong": "0 48px 85px -32px rgba(37, 99, 235, 0.55)",
      "--backdrop-blur": "blur(24px)",
    },
  },
  auroraMist: {
    label: "Aurora Mist",
    description:
      "Glassmorphism inspired greens with a calm lavender highlight.",
    mode: "light",
    cssVars: {
      "--color-bg": "#ecfdf5",
      "--color-surface": "#d1fae5",
      "--color-card": "rgba(236, 253, 245, 0.9)",
      "--color-nav": "rgba(236, 253, 245, 0.92)",
      "--color-nav-text": "#064e3b",
      "--color-text": "#022c22",
      "--color-text-muted": "#047857",
      "--color-accent": "#34d399",
      "--color-accent-hover": "#10b981",
      "--color-accent-contrast": "#022c22",
      "--color-border": "rgba(16, 185, 129, 0.22)",
      "--color-ring": "rgba(52, 211, 153, 0.42)",
      "--gradient-hero":
        "linear-gradient(135deg, rgba(236, 253, 245, 1) 0%, rgba(221, 214, 254, 1) 100%)",
      "--shadow-soft": "0 22px 48px -30px rgba(4, 120, 87, 0.38)",
      "--shadow-strong": "0 32px 72px -32px rgba(16, 185, 129, 0.55)",
      "--backdrop-blur": "blur(18px)",
    },
  },
  cyberBloom: {
    label: "Cyber Bloom",
    description:
      "Bold magenta and teal pairing with saturated gradients for energetic sprints.",
    mode: "dark",
    cssVars: {
      "--color-bg": "#130016",
      "--color-surface": "#1f0225",
      "--color-card": "rgba(31, 2, 37, 0.9)",
      "--color-nav": "rgba(19, 0, 22, 0.86)",
      "--color-nav-text": "#fce7f3",
      "--color-text": "#fdf2f8",
      "--color-text-muted": "#f9a8d4",
      "--color-accent": "#f472b6",
      "--color-accent-hover": "#ec4899",
      "--color-accent-contrast": "#2a0a35",
      "--color-border": "rgba(244, 114, 182, 0.26)",
      "--color-ring": "rgba(129, 140, 248, 0.42)",
      "--gradient-hero":
        "linear-gradient(145deg, rgba(124, 58, 237, 0.9) 0%, rgba(236, 72, 153, 0.9) 100%)",
      "--shadow-soft": "0 30px 58px -34px rgba(236, 72, 153, 0.48)",
      "--shadow-strong": "0 48px 95px -36px rgba(129, 140, 248, 0.55)",
      "--backdrop-blur": "blur(26px)",
    },
  },
};

export const themeList = Object.entries(themePresets).map(
  ([key, value]) => ({
    key,
    ...value,
  })
);

export const isDarkTheme = (themeKey) =>
  themePresets[themeKey]?.mode === "dark";

