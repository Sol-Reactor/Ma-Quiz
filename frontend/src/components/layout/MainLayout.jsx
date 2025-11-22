// src/layouts/MainLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import AuthModal from "./AuthModal";
import Footer from "./Footer";
import { AuthModalProvider } from "../../context/AuthModalContext";

function MainLayout() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false); // Just close the modal, navigation is handled by AuthModal
  };

  return (
    <AuthModalProvider
      isModalOpen={isAuthModalOpen}
      setIsModalOpen={setIsAuthModalOpen}
    >
      <NavBar /> {/* NavBar now receives setIsAuthModalOpen via context */}
      <main className="pt-20 min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] transition-[background,color] duration-300">
        <Outlet />
      </main>
      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </AuthModalProvider>
  );
}

export default MainLayout;
