import React, { createContext, useContext } from "react";

const AuthModalContext = createContext(null);

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within an AuthModalProvider");
  }
  return context;
};

export const AuthModalProvider = ({
  children,
  isModalOpen,
  setIsModalOpen,
}) => {
  return (
    <AuthModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
      {children}
    </AuthModalContext.Provider>
  );
};
