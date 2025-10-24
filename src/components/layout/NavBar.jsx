import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import AuthModal from "./AuthModal";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // AUTHENTICATION STATE: False by default
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Quiz", href: "/quiz" },
    { name: "Contact", href: "/contact" },
  ];

  const baseLinkClasses =
    "text-gray-600 hover:text-indigo-600 font-medium transition duration-150 py-2 px-3 rounded-md";
  const activeLinkClasses =
    "text-white bg-indigo-600 font-bold py-2 px-3 rounded-md";

  // LOGIC: Function to handle successful login/signup
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // LOGIC: Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false); // Close mobile menu if open
  };

  // LOGIC: Action Button rendering based on auth status
  const AuthButton = ({ className, isMobile = false }) =>
    isAuthenticated ? (
      <button
        onClick={handleLogout}
        className={
          isMobile
            ? "block text-center w-full mt-2 py-2 px-4 text-base font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition duration-200 shadow-md"
            : `${className} bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-150 shadow-md`
        }
      >
        Log Out
      </button>
    ) : (
      <button
        onClick={() => {
          if (isMobile) setIsOpen(false);
          setIsModalOpen(true);
        }}
        className={
          isMobile
            ? "block text-center w-full mt-2 py-2 px-4 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
            : `${className} bg-white hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-full shadow-slate-500 transition duration-150 shadow-md`
        }
      >
        Sign Up
      </button>
    );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-150"
            >
              Aura
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
        <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-100">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "block px-3 py-2 rounded-md text-base font-bold text-white bg-indigo-600 transition duration-150"
                    : "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition duration-150"
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

      {/* The Modal Component */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAuthSuccess={handleAuthSuccess} // <-- Pass the success handler
      />
    </>
  );
}

export default NavBar;
