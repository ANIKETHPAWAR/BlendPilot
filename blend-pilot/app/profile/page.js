"use client";

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaUserEdit, FaLock, FaListAlt } from 'react-icons/fa';
import ProfileSettings from './components/ProfileSettings';
import MyBlogs from './components/MyBlogs';
import ChangePassword from './components/ChangePassword';

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

const ProfilePage = () => {
      const { user, loading } = useAuth();
      const router = useRouter();
      const [activeTab, setActiveTab] = useState('profile');

      if (loading) {
            return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
      }

      if (!user) {
            router.push('/login');
            return null;
      }

      const tabs = [
            { id: 'profile', label: 'Profile Settings', icon: FaUserEdit },
            { id: 'blogs', label: 'My Blogs', icon: FaListAlt },
            { id: 'password', label: 'Change Password', icon: FaLock },
      ];

      return (
            <main className="container mx-auto px-4 py-24 md:py-32">
                  <h1 className="text-4xl font-bold font-rajdhani mb-8 text-center text-white">My Profile</h1>
                  <div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-1/4">
                              <div className="glass-card p-4 rounded-lg">
                                    {tabs.map(tab => (
                                          <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center gap-3 p-3 my-1 rounded-md text-left transition-colors text-white ${activeTab === tab.id ? 'bg-[#007BFF]' : 'hover:bg-slate-800'}`}
                                          >
                                                <tab.icon />
                                                {tab.label}
                                          </button>
                                    ))}
                              </div>
                        </aside>
                        <section className="w-full md:w-3/4">
                              <div className="glass-card p-6 md:p-8 rounded-lg text-white">
                                    {activeTab === 'profile' && <ProfileSettings />}
                                    {activeTab === 'blogs' && <MyBlogs />}
                                    {activeTab === 'password' && <ChangePassword />}
                              </div>
                        </section>
                  </div>
            </main>
      );
};

export default ProfilePage;