import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  defaultThemeKey,
  themeList,
  themePresets,
  isDarkTheme,
} from "../constants/themes";

const storageKey = "myquiz-theme";

const ThemeContext = createContext({
  themeKey: defaultThemeKey,
  theme: themePresets[defaultThemeKey],
  setTheme: () => {},
  cycleTheme: () => {},
  themes: themeList,
});

const getInitialThemeKey = () => {
  if (typeof window === "undefined") {
    return defaultThemeKey;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (saved && themePresets[saved]) {
    return saved;
  }

  const legacy = window.localStorage.getItem("theme");
  if (legacy === "dark" && themePresets.midnightPulse) {
    return "midnightPulse";
  }
  if (legacy === "light" && themePresets[defaultThemeKey]) {
    return defaultThemeKey;
  }

  return defaultThemeKey;
};

export const ThemeProvider = ({ children }) => {
  const [themeKey, setThemeKey] = useState(getInitialThemeKey);
  const previousThemeClass = useRef(null);
  const appliedCustomProps = useRef([]);

  useEffect(() => {
    const targetKey = themePresets[themeKey] ? themeKey : defaultThemeKey;
    const theme = themePresets[targetKey];
    const root = document.documentElement;

    // Remove previously applied CSS custom properties
    if (appliedCustomProps.current.length > 0) {
      appliedCustomProps.current.forEach((prop) =>
        root.style.removeProperty(prop)
      );
      appliedCustomProps.current = [];
    }

    // Apply new custom properties
    Object.entries(theme.cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
      appliedCustomProps.current.push(property);
    });

    // Handle Tailwind dark mode class
    if (isDarkTheme(targetKey)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Attach theme class for easier scoped styling
    const nextClassName = `theme-${targetKey}`;
    if (previousThemeClass.current) {
      root.classList.remove(previousThemeClass.current);
    }
    root.classList.add(nextClassName);
    previousThemeClass.current = nextClassName;

    // Expose theme key as data attribute
    root.dataset.theme = targetKey;

    // Persist selection
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, targetKey);
    }

    // Ensure smooth transitions
    root.style.setProperty(
      "--theme-transition",
      "background 220ms ease, color 220ms ease, border-color 220ms ease, box-shadow 220ms ease"
    );
  }, [themeKey]);

  const setTheme = useCallback((nextKey) => {
    if (!nextKey || !themePresets[nextKey]) {
      setThemeKey(defaultThemeKey);
      return;
    }
    setThemeKey(nextKey);
  }, []);

  const cycleTheme = useCallback(
    (direction = 1) => {
      const keys = themeList.map(({ key }) => key);
      const currentIndex = keys.findIndex((key) => key === themeKey);
      const nextIndex = (currentIndex + direction + keys.length) % keys.length;
      setThemeKey(keys[nextIndex]);
    },
    [themeKey]
  );

  const value = useMemo(
    () => ({
      themeKey,
      theme: themePresets[themeKey] ?? themePresets[defaultThemeKey],
      setTheme,
      cycleTheme,
      themes: themeList,
    }),
    [themeKey, setTheme, cycleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

