import { NavLink, useNavigate } from "react-router-dom";
import { Home, User, Calendar } from "lucide-react";
import Menu from "../../assets/logos/menu.svg";
import { X } from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded
     ${isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-100"}`;

  return (
    <>
      {/* Overlay (mobile only) */}
      <div
        className={`
          fixed inset-0 bg-black/50 z-40 md:hidden
          transition-opacity duration-300
          ${open ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-50 md:z-auto
          top-0 left-0 h-full bg-white border-r
          w-64
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b">
          <button
            type="button"
            onClick={() => navigate("/")} className="h-14 flex items-center justify-center border-b">

            <img
              src={Menu}
              alt="Logo"
              className="h-8 transition-all duration-300"
            />

          </button>

          <button className="md:hidden" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Links */}
        <nav className="p-3 space-y-2">
          <NavLink to="/dashboard" onClick={onClose} className={linkClass}>
            <Home size={20} /> Dashboard
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            onClick={onClose}
            className={linkClass}
          >
            <User size={20} /> Profile
          </NavLink>

          <NavLink
            to="/dashboard/bookings"
            onClick={onClose}
            className={linkClass}
          >
            <Calendar size={20} /> My Bookings
          </NavLink>
        </nav>
      </aside>
    </>
  );
}