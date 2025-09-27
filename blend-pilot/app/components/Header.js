"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useContext } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, loading, logout } = useContext(AuthContext);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: "fas fa-home" },
    { href: "/about", label: "About", icon: "fas fa-info-circle" },
    { href: "/services", label: "Services", icon: "fas fa-concierge-bell" },
    { href: "/portfolio", label: "Portfolio", icon: "fas fa-briefcase" },
    { href: "/blogs", label: "Blogs", icon: "fas fa-newspaper" },
    { href: "/contact", label: "Contact", icon: "fas fa-envelope" },
  ];

  const bottomNavLinks = [
    { href: "/", label: "Home", icon: "fas fa-home" },
    { href: "/services", label: "Services", icon: "fas fa-concierge-bell" },
    { href: "/blogs", label: "Blogs", icon: "fas fa-newspaper" },
    { href: "/profile", label: "Profile", icon: "fas fa-user" },
  ];

  return (
    <>
      {/* Top Header */}
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${isScrolled ? "bg-slate-900/80 backdrop-blur-md border-b border-[#007BFF]/20" : "border-b border-transparent"}`}>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" title="Go to Blend Pilot Homepage">
              <Image src="https://i.ibb.co/b5xP5KTS/Untitled-design-3-Photoroom.png" alt="Blend Pilot Logo" width={100} height={60} className="invert brightness-0" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? "active" : ""}`}>
                  {link.label}
                </Link>
              ))}
              {loading ? (
                <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse"></div>
              ) : user ? (
                <div className="relative" ref={profileMenuRef}>
                  <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-transparent hover:border-white transition-colors">
                    <Image src={user.picture || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`} alt="profile" width={40} height={40} className="rounded-full object-cover" />
                  </button>
                  {isProfileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900/80 backdrop-blur-md rounded-lg shadow-lg py-2 z-20 border border-[#007BFF]/20">
                      <p className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">Signed in as</p>
                      <p className="px-4 py-2 text-sm text-white font-semibold truncate">{user?.email}</p>
                      <Link href="/profile" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-white/80 hover:bg-slate-800 transition-colors">My Profile</Link>
                      {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                        <Link href="/admin" onClick={() => setIsProfileMenuOpen(false)} className="block px-4 py-2 text-white/80 hover:bg-slate-800 transition-colors">Dashboard</Link>
                      )}
                      <button onClick={() => { logout(); setIsProfileMenuOpen(false); }} className="w-full text-left px-4 py-2 text-white/80 hover:bg-red-500/80 hover:text-white transition-colors">Logout</button>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="inline-block px-5 py-2 text-sm font-semibold text-white bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-blue-400">
                  Login/Register
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden text-white" aria-label="Toggle menu">
              <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars-staggered"} text-2xl`}></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300 lg:hidden ${isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setIsMenuOpen(false)}></div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-4/5 max-w-sm bg-slate-900/80 backdrop-blur-xl shadow-2xl z-[120] transition-transform duration-300 ease-in-out lg:hidden ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 flex flex-col h-full">
          {user ? (
            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
              <Image src={user.picture || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`} alt="profile" width={50} height={50} className="rounded-full object-cover" />
              <div>
                <h3 className="font-semibold text-white">{user.name}</h3>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>
          ) : (
            <h2 className="text-xl font-bold text-white mb-8">Navigation</h2>
          )}

          <div className="flex flex-col space-y-4 mt-8 flex-grow">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 text-lg font-semibold p-3 rounded-lg transition-colors duration-300 ${pathname === link.href ? "bg-[#007BFF] text-white" : "text-white/80 hover:bg-slate-800"}`}>
                <i className={`${link.icon} w-6 text-center`}></i>
                {link.label}
              </Link>
            ))}
            {(user && (user.role === "ADMIN" || user.role === "SUPER_ADMIN")) && (
              <Link href="/admin" onClick={() => setIsMenuOpen(false)} className={`flex items-center gap-4 text-lg font-semibold p-3 rounded-lg transition-colors duration-300 ${pathname.startsWith('/admin') ? "bg-[#007BFF] text-white" : "text-white/80 hover:bg-slate-800"}`}>
                <i className="fas fa-shield-halved w-6 text-center"></i>
                Dashboard
              </Link>
            )}
          </div>
          <div className="mt-auto">
            {user ? (
              <button onClick={logout} className="flex items-center gap-4 w-full text-lg font-semibold p-3 rounded-lg transition-colors duration-300 text-red-400 hover:bg-red-500/20 text-left">
                <i className="fas fa-sign-out-alt w-6 text-center"></i>
                Logout
              </button>
            ) : (
              <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-4 text-lg font-semibold p-3 rounded-lg transition-colors duration-300 text-white/80 hover:bg-slate-800">
                <i className="fas fa-sign-in-alt w-6 text-center"></i>
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-slate-900/80 backdrop-blur-md border-t border-[#007BFF]/20 z-[90] pb-[env(safe-area-inset-bottom)]">
        <div className="flex justify-around items-center h-16">
          {bottomNavLinks.map((link) => (
            <Link key={link.href} href={link.href} className="flex flex-col items-center justify-center text-center w-1/4">
              <i className={`${link.icon} text-xl transition-colors duration-300 ${pathname === link.href ? "text-[#007BFF]" : "text-gray-400"}`}></i>
              <span className={`text-xs mt-1 transition-colors duration-300 ${pathname === link.href ? "text-white" : "text-gray-500"}`}>{link.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

const styles = `
  .nav-link { transition: color 0.3s; font-weight: 600; color: rgba(255, 255, 255, 0.8); }
  .nav-link:hover { color: white; }
  .nav-link.active { color: #007BFF; }
`;

if (typeof window !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  if (!document.getElementById("custom-nav-styles")) {
    styleSheet.id = "custom-nav-styles";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
}

export default Header;