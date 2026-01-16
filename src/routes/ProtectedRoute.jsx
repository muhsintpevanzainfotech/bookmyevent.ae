import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  // ❌ Not logged in → Sign In
  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }

  // ✅ Logged in → allow
  return children;
}
