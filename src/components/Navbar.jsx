import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, Bell, User, Home,
  ShoppingCart, MessageCircle, HelpCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { navLinks } from "../data/navLinks";
import SearchBarWithLocation from "./search/SearchBarWithLocation";

/* ================= SIDE DRAWER ================= */
function SideDrawer({ open, onClose, title, children }) {
  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className={`absolute top-0 right-0 h-full w-[90%] max-w-md bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}><X /></button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ================= NAVBAR ================= */
export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();
  const lastScrollY = useRef(0);

  /* ================= REDUX API DATA ================= */
  const { modules = [], secondaryModules = [], loading } = useSelector(
    (state) => ({
      modules: state.modules?.modules || [],
      secondaryModules: state.secondaryModules?.secondaryModules || [],
      loading: state.modules?.loading || false,
    })
  );

  /* ================= SCROLL HIDE ================= */
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenu || cartOpen || notificationOpen) return;
      const currentScrollY = window.scrollY;
      setShowNavbar(
        !(currentScrollY > lastScrollY.current && currentScrollY > 80)
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenu, cartOpen, notificationOpen]);

  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    document.body.style.overflow =
      mobileMenu || cartOpen || notificationOpen ? "hidden" : "";
  }, [mobileMenu, cartOpen, notificationOpen]);

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`fixed top-0 z-50 w-full bg-white transition-all duration-500 ${
          showNavbar || mobileMenu
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-20 pointer-events-none"
        }`}
      >
        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between px-4 md:px-12 py-3">
          <img
            src="/menu.svg"
            className="h-9 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <SearchBarWithLocation />
          </div>

          <div className="hidden md:flex items-center gap-5">
            <button onClick={() => navigate("/contact")}><HelpCircle /></button>
            <button onClick={() => setCartOpen(true)}><ShoppingCart /></button>
            <button onClick={() => setNotificationOpen(true)}><Bell /></button>
            <button onClick={() => navigate("/dashboard/profile")}><User /></button>
          </div>

          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setNotificationOpen(true)}><Bell /></button>
            <button onClick={() => setMobileMenu(true)}><Menu /></button>
          </div>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div className="hidden md:flex justify-center px-12 py-3 bg-white/80">
          <nav className="flex gap-8 font-medium">
            <NavLink to="/" className="hover:text-red-600">Home</NavLink>

            {/* MAIN SERVICES */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-red-600 border-none outline-none">
                Main Services <ChevronDown size={16} />
              </button>

              <div className="absolute left-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                {loading && <p className="px-4 py-2 text-sm">Loading...</p>}

                {modules.map((m) => (
                  <NavLink
                    key={m._id}
                    to={`/service/${m.title.toLowerCase().replace(/\s+/g, "-")}/${m._id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={`${import.meta.env.VITE_IMAGE_API}/${m.icon}`}
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-sm">{m.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* OTHER SERVICES */}
            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-red-600 border-none outline-none">
                Other Services <ChevronDown size={16} />
              </button>

              <div className="absolute left-0 top-full mt-3 w-72 bg-white rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                {secondaryModules.map((s) => (
                  <NavLink
                    key={s._id}
                    to={`/otherservice/${s.title.toLowerCase().replace(/\s+/g, "-")}/${s._id}`}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100"
                  >
                    <img
                      src={`${import.meta.env.VITE_IMAGE_API}/${s.icon}`}
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-sm">{s.title}</span>
                  </NavLink>
                ))}
              </div>
            </div>

            {navLinks.filter((l) => l.name !== "Home").map((l) => (
              <NavLink key={l.name} to={l.href} className="hover:text-red-600">
                {l.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        className={`fixed inset-0 z-[99] md:hidden transition-opacity ${
          mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenu(false)} />

        <div
          className={`absolute top-0 right-0 h-full w-[90%] bg-white transition-transform duration-300 ${
            mobileMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <X onClick={() => setMobileMenu(false)} />
          </div>

          <div className="px-5 py-4 space-y-4 overflow-y-auto h-full">
            <NavLink to="/" onClick={() => setMobileMenu(false)} className="block font-medium">
              Home
            </NavLink>

            {/* MAIN MOBILE */}
            <button
              className="w-full flex justify-between items-center font-medium border-none outline-none"
              onClick={() => setMobileDropdown(mobileDropdown === "main" ? null : "main")}
            >
              Main Services
              <ChevronDown className={`transition-transform ${mobileDropdown === "main" ? "rotate-180" : ""}`} />
            </button>

            <div className={`pl-4 space-y-3 overflow-hidden transition-all duration-300 ${
              mobileDropdown === "main" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}>
              {modules.map((m) => (
                <NavLink
                  key={m._id}
                  to={`/service/${m.title.toLowerCase().replace(/\s+/g, "-")}/${m._id}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3"
                >
                  <img src={`${import.meta.env.VITE_IMAGE_API}/${m.icon}`} className="w-6 h-6 rounded-full" />
                  <span className="text-sm">{m.title}</span>
                </NavLink>
              ))}
            </div>

            {/* OTHER MOBILE */}
            <button
              className="w-full flex justify-between items-center font-medium border-none outline-none"
              onClick={() => setMobileDropdown(mobileDropdown === "other" ? null : "other")}
            >
              Other Services
              <ChevronDown className={`transition-transform ${mobileDropdown === "other" ? "rotate-180" : ""}`} />
            </button>

            <div className={`pl-4 space-y-3 overflow-hidden transition-all duration-300 ${
              mobileDropdown === "other" ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
            }`}>
              {secondaryModules.map((s) => (
                <NavLink
                  key={s._id}
                  to={`/otherservice/${s.title.toLowerCase().replace(/\s+/g, "-")}/${s._id}`}
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 text-gray-600"
                >
                  <img src={`${import.meta.env.VITE_IMAGE_API}/${s.icon}`} className="w-6 h-6 rounded-full" />
                  <span className="text-sm">{s.title}</span>
                </NavLink>
              ))}
            </div>

            <hr />

            {navLinks.filter((l) => l.name !== "Home").map((l) => (
              <NavLink key={l.name} to={l.href} onClick={() => setMobileMenu(false)} className="block font-medium">
                {l.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* ================= DRAWERS ================= */}
      <SideDrawer open={cartOpen} onClose={() => setCartOpen(false)} title="Cart">
        Cart content
      </SideDrawer>

      <SideDrawer open={notificationOpen} onClose={() => setNotificationOpen(false)} title="Notifications">
        Notification content
      </SideDrawer>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white md:hidden shadow">
        <div className="flex justify-around py-2 text-xs">
          <NavLink to="/" className="flex flex-col items-center"><Home size={20} />Home</NavLink>
          <NavLink to="/chat" className="flex flex-col items-center"><MessageCircle size={20} />Chat</NavLink>
          <NavLink to="/dashboard/profile" className="flex flex-col items-center"><User size={20} />Profile</NavLink>
        </div>
      </nav>
    </>
  );
}
