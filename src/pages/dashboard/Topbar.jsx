import { Menu, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Topbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = () => {
    if (loggingOut) return;
    setLoggingOut(true);

    dispatch(logout());

    // small delay for smooth UX
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 100);
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-1 rounded hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu />
        </button>
        <span className="font-bold text-lg">MyDashboard</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <User className="text-gray-600" />

        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="text-red-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 disabled:opacity-50"
        >
          <LogOut size={18} />
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
    </header>
  );
}
