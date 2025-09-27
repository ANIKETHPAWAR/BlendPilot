"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaUsers, FaNewspaper, FaSignOutAlt, FaHome, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '@/app/context/AuthContext';

const Sidebar = () => {
      const pathname = usePathname();
      const { logout } = useAuth();

      const navItems = [
            { href: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
            { href: '/admin/blogs', icon: FaNewspaper, label: 'Blogs' },
            { href: '/admin/users', icon: FaUsers, label: 'Users' },
            { href: '/admin/contacts', icon: FaEnvelope, label: 'Contacts' },
      ];

      return (
            <aside className="fixed top-0 left-0 w-64 h-full bg-slate-900/70 backdrop-blur-md border-r border-white/10 hidden md:flex flex-col">
                  <div className="p-6 text-center border-b border-white/10">
                        <Link href="/admin">
                              <h1 className="text-2xl font-bold font-rajdhani">Admin Panel</h1>
                        </Link>
                  </div>
                  <nav className="flex-1 p-4 space-y-2">
                        {navItems.map(item => (
                              <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${pathname === item.href
                                          ? 'bg-[#007BFF] text-white'
                                          : 'text-gray-300 hover:bg-slate-800'
                                          }`}
                              >
                                    <item.icon className="text-xl" />
                                    <span className="font-semibold">{item.label}</span>
                              </Link>
                        ))}
                  </nav>
                  <div className="p-4 border-t border-white/10 space-y-2">
                        <Link
                              href="/"
                              className="flex items-center gap-4 p-3 w-full rounded-lg text-gray-300 hover:bg-slate-800 transition-colors duration-200"
                        >
                              <FaHome className="text-xl" />
                              <span className="font-semibold">Back to Home</span>
                        </Link>
                        <button
                              onClick={logout}
                              className="flex items-center gap-4 p-3 w-full rounded-lg text-red-400 hover:bg-red-500/20 transition-colors duration-200"
                        >
                              <FaSignOutAlt className="text-xl" />
                              <span className="font-semibold">Logout</span>
                        </button>
                  </div>
            </aside>
      );
};

export default Sidebar;