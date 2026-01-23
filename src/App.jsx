import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

// Layouts
import PublicLayout from "./layouts/PublicLayout";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Dashboard
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import Profile from "./pages/dashboard/Profile";
import MyBookings from "./pages/dashboard/MyBookings";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

// Redux
import { loadDataRequest } from "./features/global/globalSlice";
import { loadModulesRequest } from "./features/modules/moduleSlice";
import { loadSecondaryModulesRequest } from "./features/secondaryModules/secondaryModuleSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔥 Load everything once
    dispatch(loadDataRequest());               // global data
    dispatch(loadModulesRequest());            // main services
    dispatch(loadSecondaryModulesRequest());   // sub services
  }, [dispatch]);

  return (
    <Routes>
      {/* ================= AUTH ================= */}
      <Route
        path="/signin"
        element={
          <PublicOnlyRoute>
            <SignIn />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicOnlyRoute>
            <SignUp />
          </PublicOnlyRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <PublicOnlyRoute>
            <ForgotPassword />
          </PublicOnlyRoute>
        }
      />

      {/* ================= PUBLIC ================= */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* ================= DASHBOARD ================= */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="profile" element={<Profile />} />
        <Route path="bookings" element={<MyBookings />} />
      </Route>

      {/* ================= 404 ================= */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
