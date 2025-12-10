import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import ProfileModal from "./ProfileModal";
import toast from "react-hot-toast";
import {
  PaintBrushIcon,
  ChevronDownIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";
import { FaSignOutAlt } from "react-icons/fa";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, isAdmin } = useAuth();
  const { themeKey, setTheme, themes, cycleTheme } = useTheme();
  const navigate = useNavigate();
  const themeMenuRef = useRef(null);

  const activeTheme = themes.find((item) => item.key === themeKey);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        themeMenuRef.current &&
        !themeMenuRef.current.contains(event.target)
      ) {
        setIsThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/About" },
    { name: "Quiz", href: "/Quiz" },
  ];

  // Add dashboard link based on user role
  if (isAuthenticated) {
    if (isAdmin) {
      navLinks.push({ name: "Admin", href: "/admin" });
    } else {
      navLinks.push({ name: "Dashboard", href: "/dashboard" });
    }
  }

  const baseLinkClasses =
    "text-muted hover:text-[var(--color-text)] font-semibold transition duration-150 py-2 px-3 rounded-md";
  const activeLinkClasses =
    "accent-button shadow-theme-soft font-semibold py-2 px-3 rounded-md";

  // LOGIC: Function to handle logout
  const handleLogout = () => {
    setIsOpen(false); // Close mobile menu if open
    // Use a promise to show toast *before* navigating
    toast
      .promise(
        new Promise((resolve) => {
          logout(); // Perform the logout action
          setTimeout(resolve, 1500); // Wait for toast to be visible
        }),
        {
          loading: "Logging out...",
          success: "Logout successful!",
          error: "Logout failed.",
        }
      )
      .then(() => navigate("/")); // Navigate to home page AFTER toast
  };
  const getColorFromName = (name) => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-indigo-500",
      "bg-gradient-to-br from-emerald-500 to-teal-500",
      "bg-gradient-to-br from-fuchsia-500 to-pink-500",
      "bg-gradient-to-br from-amber-400 to-orange-500",
      "bg-gradient-to-br from-cyan-400 to-sky-500",
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // LOGIC: Action Button rendering based on auth status
  const AuthButton = ({ className, isMobile = false }) =>
    isAuthenticated ? (
      <div className={`flex items-center gap-4 ${isMobile ? "w-full" : ""}`}>
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className={`${
            isMobile ? "hidden" : "flex"
          } items-center justify-center w-10 h-10 rounded-full text-white font-bold text-lg uppercase ${getColorFromName(
            user.username
          )} hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 transition-all`}
          aria-label="Open profile"
        >
          {user.username.charAt(0)}
        </button>

        <button
          onClick={handleLogout}
          className={`${
            isMobile ? "flex-1 justify-center" : ""
          } inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] font-semibold shadow-theme-soft hover:shadow-theme-strong transition-all`}
          title="Log Out" // Add this line
        >
          <FaSignOutAlt />
        </button>
      </div>
    ) : (
      <button
        onClick={() => {
          if (isMobile) setIsOpen(false);
          navigate("/signup");
        }}
        className={
          isMobile
            ? "block text-center w-full mt-2 py-2 px-4 text-base font-semibold accent-button rounded-lg hover:shadow-theme-strong transition duration-200 shadow-theme-soft"
            : `${className} accent-button px-6 py-2 rounded-full font-semibold shadow-theme-soft hover:shadow-theme-strong transition`
        }
      >
        Sign Up
      </button>
    );

  const handleThemeSelect = (nextTheme) => {
    setTheme(nextTheme);
    setIsThemeMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-nav text-[var(--color-nav-text)] shadow-theme-soft border-b border-soft backdrop-blur">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-[var(--color-text)] hover:text-[var(--color-accent)] transition duration-150"
            >
              Aura
              <span className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] transition duration-150">
                Quest
              </span>
            </Link>

            <div className="hidden md:flex space-x-2 lg:space-x-8 items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) =>
                    isActive ? activeLinkClasses : baseLinkClasses
                  }
                  end
                >
                  {link.name}
                </NavLink>
              ))}

              <div className="relative" ref={themeMenuRef}>
                <button
                  onClick={() => setIsThemeMenuOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] text-[var(--color-text)] font-semibold shadow-theme-soft hover:shadow-theme-strong transition-all border border-soft"
                >
                  <PaintBrushIcon className="h-5 w-5 text-[var(--color-accent)]" />
                  <span>{activeTheme?.label ?? "Theme"}</span>
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform ${
                      isThemeMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isThemeMenuOpen && (
                  <div className="absolute right-0 mt-3 w-60 rounded-2xl glass-panel py-3 z-20">
                    <div className="flex items-center justify-between px-4 pb-2 border-b border-soft">
                      <p className="text-xs font-semibold text-muted uppercase tracking-[0.16em]">
                        Themes
                      </p>
                      <button
                        onClick={() => {
                          cycleTheme(1);
                          setIsThemeMenuOpen(false);
                        }}
                        className="p-1.5 rounded-full bg-[var(--color-surface)] hover:bg-[var(--color-card)] transition"
                        title="Cycle themes"
                      >
                        <ArrowPathRoundedSquareIcon className="h-5 w-5 text-[var(--color-accent)]" />
                      </button>
                    </div>
                    <ul className="max-h-64 overflow-y-auto">
                      {themes.map((theme) => (
                        <li key={theme.key}>
                          <button
                            onClick={() => handleThemeSelect(theme.key)}
                            className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition flex flex-col gap-0.5 ${
                              theme.key === themeKey
                                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-theme-soft"
                                : "text-muted hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]"
                            }`}
                          >
                            <span>{theme.label}</span>
                            <span className="text-xs text-muted">
                              {theme.description}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Desktop Action Button: Uses conditional rendering via AuthButton */}
              <AuthButton className="ml-6" />
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition duration-150"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Panel */}
        <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-nav`}>
          <div className="px-4 pt-3 pb-4 space-y-3 border-t border-soft">
            <div className="flex items-center justify-between bg-[var(--color-surface)] border border-soft rounded-xl px-3 py-2 shadow-theme-soft">
              <div>
                <p className="text-xs uppercase text-muted tracking-wide">
                  Theme
                </p>
                <p className="text-sm font-semibold text-[var(--color-text)]">
                  {activeTheme?.label ?? "Select Theme"}
                </p>
              </div>
              <select
                value={themeKey}
                onChange={(event) => handleThemeSelect(event.target.value)}
                className="bg-transparent text-sm font-medium text-[var(--color-text)] focus:outline-none"
              >
                {themes.map((theme) => (
                  <option key={theme.key} value={theme.key}>
                    {theme.label}
                  </option>
                ))}
              </select>
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "block px-4 py-2.5 rounded-xl text-base font-semibold text-[var(--color-accent-contrast)] accent-button shadow-theme-soft transition duration-150"
                    : "block px-4 py-2.5 rounded-xl text-base font-medium text-[var(--color-text)] bg-[var(--color-surface)] hover:shadow-theme-soft transition duration-150"
                }
                onClick={() => setIsOpen(false)}
                end={link.href === "/"}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Action Button: Uses conditional rendering via AuthButton */}
            <AuthButton isMobile={true} />
          </div>
        </div>
      </header>
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(!isProfileModalOpen)}
      />
    </>
  );
}

export default NavBar;
