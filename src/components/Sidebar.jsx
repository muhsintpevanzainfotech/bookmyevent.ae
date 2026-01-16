import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside className="w-64 bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>

      <nav className="space-y-4">
        <Link to="/dashboard/profile">Profile</Link>
        <Link to="/dashboard/bookings">My Bookings</Link>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600 py-2 rounded"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}
