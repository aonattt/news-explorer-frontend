import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, isAuthChecked, onUnauthorized, children }) {
  const shouldRedirect = isAuthChecked && !isLoggedIn;

  useEffect(() => {
    if (shouldRedirect) {
      onUnauthorized();
    }
  }, [shouldRedirect, onUnauthorized]);

  if (!isAuthChecked) {
    return null;
  }
  return shouldRedirect ? <Navigate to="/" replace /> : children;
}

export default ProtectedRoute;
