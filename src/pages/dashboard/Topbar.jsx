import { Menu, LogOut, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onMenuClick }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button className="md:hidden" onClick={onMenuClick}>
          <Menu />
        </button>
        <span className="font-bold">MyDashboard</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <User />
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/signin");
          }}
          className="text-red-600 flex items-center gap-1"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </header>
  );
}
