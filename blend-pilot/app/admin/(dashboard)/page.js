"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaNewspaper, FaClock, FaCheckCircle } from 'react-icons/fa';

const StatsCard = ({ icon: Icon, title, value, color }) => (
      <div className="glass-card p-6 rounded-lg flex items-center gap-6">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon className="text-3xl text-white" />
            </div>
            <div>
                  <p className="text-gray-400 text-sm font-semibold">{title}</p>
                  <h3 className="text-3xl font-bold">{value}</h3>
            </div>
      </div>
);

export default function AdminDashboard() {
      const [stats, setStats] = useState({ users: 0, blogs: 0, pending: 0, approved: 0 });
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const fetchStats = async () => {
                  try {
                        const token = localStorage.getItem('accessToken');
                        const headers = { Authorization: `Bearer ${token}` };

                        const [userRes, blogRes, pendingRes, approvedRes] = await Promise.all([
                              axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, { headers }),
                              axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, { headers }),
                              axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs?status=PENDING`, { headers }),
                              axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs?status=APPROVED`, { headers }),
                        ]);

                        setStats({
                              users: userRes.data.meta.total || 0,
                              blogs: blogRes.data.meta.total || 0,
                              pending: pendingRes.data.meta.total || 0,
                              approved: approvedRes.data.meta.total || 0,
                        });
                  } catch (error) {
                        console.error("Failed to fetch stats:", error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchStats();
      }, []);

      if (loading) return <p>Loading stats...</p>;

      return (
            <div>
                  <h1 className="text-4xl font-bold font-rajdhani mb-8">Dashboard</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatsCard icon={FaUsers} title="Total Users" value={stats.users} color="bg-blue-500" />
                        <StatsCard icon={FaNewspaper} title="Total Blogs" value={stats.blogs} color="bg-green-500" />
                        <StatsCard icon={FaClock} title="Pending Blogs" value={stats.pending} color="bg-yellow-500" />
                        <StatsCard icon={FaCheckCircle} title="Approved Blogs" value={stats.approved} color="bg-purple-500" />
                  </div>
            </div>
      );
}