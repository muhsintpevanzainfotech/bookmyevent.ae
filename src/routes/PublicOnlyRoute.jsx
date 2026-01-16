import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicOnlyRoute({ children }) {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  // ✅ Already logged in → Dashboard
  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
