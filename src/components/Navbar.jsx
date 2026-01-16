import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Bell,
  User,
  Home,
  ShoppingCart,
  MessageCircle,
  HelpCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from "../data/navLinks";

/* ================= REUSABLE SIDE DRAWER ================= */
function SideDrawer({ open, onClose, title, children }) {
  return (
    <div
      className={`
        fixed inset-0 z-[60]
        transition-opacity duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}
      `}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`
          absolute top-0 right-0 h-full w-[90%] max-w-md bg-white
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="p-5">
          {children}
        </div>
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

  /* ===== Scroll hide / show ===== */
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenu || cartOpen || notificationOpen) return;

      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenu, cartOpen, notificationOpen]);

  /* ===== Body scroll lock ===== */
  useEffect(() => {
    if (mobileMenu || cartOpen || notificationOpen) {
      document.body.style.overflow = "hidden";
      setShowNavbar(true);
    } else {
      document.body.style.overflow = "";
      setMobileDropdown(null);
    }
  }, [mobileMenu, cartOpen, notificationOpen]);

  const navClass = ({ isActive }) =>
    isActive ? "text-red-600 font-semibold" : "hover:text-red-600";

  const openCart = () => {
    setNotificationOpen(false);
    setCartOpen(true);
  };

  const openNotification = () => {
    setCartOpen(false);
    setNotificationOpen(true);
  };

  return (
    <>
      {/* ================= HEADER ================= */}
      <header
        className={`
          fixed top-0 z-50 w-full bg-white
          transition-all duration-500 ease-out
          ${
            showNavbar || mobileMenu
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-20 pointer-events-none"
          }
        `}
      >
        {/* TOP BAR */}
        <div className="flex items-center justify-between px-4 md:px-12 py-3">
          {/* Logo */}
          <img
            src="/menu.svg"
            alt="logo"
            className="h-9 cursor-pointer"
            onClick={() => navigate("/")}
          />

          {/* Search Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="flex w-full items-center bg-gray-100 rounded-full px-4 py-2">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Find your best package"
                className="w-full bg-transparent outline-none px-3 text-sm"
              />
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-5">
            <button onClick={() => navigate("/contact")}>
              <HelpCircle />
            </button>

            <button onClick={openCart}>
              <ShoppingCart />
            </button>

            <button onClick={openNotification}>
              <Bell />
            </button>

            <button onClick={() => navigate("/dashboard/profile")}>
              <User />
            </button>
          </div>

          {/* Mobile Icons */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={openNotification}>
              <Bell />
            </button>

            <button onClick={() => setMobileMenu(prev => !prev)}>
              {mobileMenu ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* ================= DESKTOP NAV ================= */}
        <div
          className="hidden md:flex items-center justify-center px-12 py-3"
          style={{ background: "#ffffffcc" }}
        >
          <nav className="flex gap-8 font-medium">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative group">
                  <button className="flex items-center gap-1 hover:text-red-600">
                    {item.name}
                    <ChevronDown size={16} />
                  </button>

                  <div className="absolute left-0 top-full mt-3 w-[520px] bg-white shadow-xl rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                    <div className="grid grid-cols-3 gap-4">
                      {item.dropdown.map((sub) => (
                        <NavLink key={sub.name} to={sub.href} className="group">
                          <img
                            src={sub.image}
                            alt={sub.name}
                            className="h-28 w-full object-cover rounded-lg"
                          />
                          <p className="mt-2 text-sm font-medium group-hover:text-red-600">
                            {sub.name}
                          </p>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <NavLink key={item.name} to={item.href} className={navClass}>
                  {item.name}
                </NavLink>
              )
            )}
          </nav>
        </div>
      </header>

      {/* ================= MOBILE DRAWER MENU ================= */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden
          transition-opacity duration-300
          ${mobileMenu ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileMenu(false)}
        />

        <div
          className={`
            absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white
            transition-transform duration-300 ease-out
            ${mobileMenu ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setMobileMenu(false)}>
              <X />
            </button>
          </div>

          <div className="px-5 py-4 space-y-5">
            {navLinks.map((item) =>
              item.dropdown ? (
                <div key={item.name}>
                  <button
                    className="w-full flex justify-between font-medium"
                    onClick={() =>
                      setMobileDropdown(
                        mobileDropdown === item.name ? null : item.name
                      )
                    }
                  >
                    {item.name}
                    <ChevronDown
                      className={`transition-transform ${
                        mobileDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileDropdown === item.name && (
                    <div className="pl-4 space-y-3 mt-2">
                      {item.dropdown.map((sub) => (
                        <NavLink
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenu(false)}
                          className="block text-gray-600"
                        >
                          {sub.name}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenu(false)}
                  className="block font-medium"
                >
                  {item.name}
                </NavLink>
              )
            )}

            <button
              onClick={() => {
                setMobileMenu(false);
                navigate("/contact");
              }}
              className="block font-medium"
            >
              Need Help
            </button>
          </div>
        </div>
      </div>

      {/* ================= CART DRAWER ================= */}
      <SideDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title="Cart"
      >
        <p className="text-gray-600">This page</p>
      </SideDrawer>

      {/* ================= NOTIFICATION DRAWER ================= */}
      <SideDrawer
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        title="Notifications"
      >
        <p className="text-gray-600">This page</p>
      </SideDrawer>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white md:hidden shadow">
        <div className="flex justify-around py-2 text-xs">
          <NavLink to="/" className="flex flex-col items-center">
            <Home size={20} />
            Home
          </NavLink>

          <button
            onClick={openCart}
            className="flex flex-col items-center"
          >
            <ShoppingCart size={20} />
            Cart
          </button>

          <NavLink to="/chat" className="flex flex-col items-center">
            <MessageCircle size={20} />
            Chat
          </NavLink>

          <NavLink to="/dashboard/profile" className="flex flex-col items-center">
            <User size={20} />
            Profile
          </NavLink>
        </div>
      </nav>
    </>
  );
}
