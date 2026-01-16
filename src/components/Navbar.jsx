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
    Mail,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks } from "../data/navLinks";

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [mobileDropdown, setMobileDropdown] = useState(null);

    return (
        <>
            {/* ================= HEADER ================= */}
            <header className="fixed top-0 z-50 w-full bg-white">
                {/* 🔹 MOBILE + DESKTOP TOP BAR */}
                <div className="flex items-center justify-between px-4 md:px-12 py-3">
                    {/* Logo */}
                    <img src="/menu.svg" className="h-9" alt="logo" />

                    {/* Search Desktop */}
                    <div className="hidden md:flex flex-1 max-w-xl mx-8">
                        <div className="flex w-full items-center bg-gray-100 rounded-full px-4 py-2">
                            <Search size={18} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Find Your best Package"
                                className="w-full bg-transparent outline-none px-3 text-sm"
                            />
                        </div>
                    </div>

                    {/* Desktop Icons */}
                    <div className="hidden md:flex items-center gap-5">
                        <HelpCircle title="Need Help" />
                        <ShoppingCart title="Cart" />
                        <Bell title="Notifications" />
                        <User title="User" />

                    </div>

                    {/* 🔹 MOBILE ICONS */}
                    <div className="flex md:hidden items-center gap-4">
                        <Search />
                        <Bell />
                        <button onClick={() => setMobileMenu(!mobileMenu)}>
                            {mobileMenu ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* 🔹 DESKTOP NAV */}
                <div className="hidden md:flex items-center justify-between px-12 py-3  ">
                    <nav className="flex gap-8 font-medium">
                        {navLinks.map((item) =>
                            item.dropdown ? (
                                <div key={item.name} className="relative group">
                                    <button className="flex items-center gap-1">
                                        {item.name}
                                        <ChevronDown size={16} />
                                    </button>

                                    {/* IMAGE DROPDOWN */}
                                    <div className="absolute left-0 top-full mt-3 w-[520px] bg-white shadow-xl rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                                        <div className="grid grid-cols-3 gap-4">
                                            {item.dropdown.map((sub) => (
                                                <NavLink
                                                    key={sub.name}
                                                    to={sub.href}
                                                    className="group"
                                                >
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
                                <NavLink key={item.name} to={item.href}>
                                    {item.name}
                                </NavLink>
                            )
                        )}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-5">
                        <MessageCircle title="WhatsApp" className="text-green-600" />
                        <Mail title="Email" />
                        <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm">
                            Enquiry
                        </button>
                    </div>
                </div>

                {/* 🔹 MOBILE SLIDE MENU */}
                {mobileMenu && (
                    <div className="md:hidden bg-white  ">
                        <div className="p-4 space-y-4 font-medium">
                            {navLinks.map((item) =>
                                item.dropdown ? (
                                    <div key={item.name}>
                                        <button
                                            onClick={() =>
                                                setMobileDropdown(
                                                    mobileDropdown === item.name ? null : item.name
                                                )
                                            }
                                            className="flex justify-between w-full"
                                        >
                                            {item.name}
                                            <ChevronDown />
                                        </button>

                                        {mobileDropdown === item.name && (
                                            <div className="mt-3 space-y-3">
                                                {item.dropdown.map((sub) => (
                                                    <NavLink
                                                        key={sub.name}
                                                        to={sub.href}
                                                        className="flex items-center gap-3"
                                                        onClick={() => setMobileMenu(false)}
                                                    >
                                                        <img
                                                            src={sub.image}
                                                            className="h-12 w-12 rounded-md object-cover"
                                                        />
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
                                    >
                                        {item.name}
                                    </NavLink>
                                )
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* ================= MOBILE BOTTOM NAV ================= */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white   md:hidden">
                <div className="flex justify-around py-2 text-xs">
                    <NavLink to="/" className="flex flex-col items-center">
                        <Home size={20} />
                        Home
                    </NavLink>

                    <NavLink to="/cart" className="flex flex-col items-center">
                        <ShoppingCart size={20} />
                        Cart
                    </NavLink>

                    <NavLink to="/chat" className="flex flex-col items-center">
                        <MessageCircle size={20} />
                        Chat
                    </NavLink>

                    <NavLink to="/profile" className="flex flex-col items-center">
                        <User size={20} />
                        Profile
                    </NavLink>
                </div>
            </nav>
        </>
    );
}
