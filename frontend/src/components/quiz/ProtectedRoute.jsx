import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Assuming you have an AuthContext

/**
 * A component that protects routes requiring authentication.
 * If the user is not authenticated, it redirects them to the sign-in page,
 * preserving the location they intended to visit.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children The component to render if the user is authenticated.
 */
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth(); // Assumes your context provides user and a loading state
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return user ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
