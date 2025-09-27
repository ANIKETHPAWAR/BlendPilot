"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/app/context/AuthContext'; // useAuth ইম্পোর্ট করুন

export default function UserManagement() {
      const [users, setUsers] = useState([]);
      const [loading, setLoading] = useState(true);
      const { user: loggedInUser } = useAuth(); // বর্তমানে লগইন করা অ্যাডমিনের তথ্য নিন

      const fetchUsers = async () => {
            setLoading(true);
            try {
                  const token = localStorage.getItem('accessToken');
                  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  setUsers(response.data.data);
            } catch (error) {
                  console.error("Failed to fetch users:", error);
            } finally {
                  setLoading(false);
            }
      };

      useEffect(() => {
            fetchUsers();
      }, []);

      const handleRoleChange = async (id, newRole) => {
            try {
                  const token = localStorage.getItem('accessToken');
                  await axios.patch(
                        `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`,
                        { role: newRole },
                        { headers: { Authorization: `Bearer ${token}` } }
                  );
                  fetchUsers();
            } catch (error) {
                  console.error("Failed to update role:", error);
            }
      };

      const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this user?")) {
                  try {
                        const token = localStorage.getItem('accessToken');
                        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
                              headers: { Authorization: `Bearer ${token}` },
                        });
                        fetchUsers();
                  } catch (error) {
                        console.error("Failed to delete user:", error);
                  }
            }
      };

      return (
            <div>
                  <h1 className="text-4xl font-bold font-rajdhani mb-8">User Management</h1>
                  <div className="bg-slate-900/50 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                              <thead className="bg-slate-800">
                                    <tr>
                                          <th className="p-4">Name</th>
                                          <th className="p-4">Email</th>
                                          <th className="p-4">Role</th>
                                          <th className="p-4">Actions</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {loading ? (
                                          <tr><td colSpan="4" className="p-4 text-center">Loading users...</td></tr>
                                    ) : (
                                          users.map(user => (
                                                <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                                      <td className="p-4">{user.name}</td>
                                                      <td className="p-4">{user.email}</td>
                                                      <td className="p-4">
                                                            {loggedInUser?.role === 'SUPER_ADMIN' ? (
                                                                  <select
                                                                        value={user.role}
                                                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                                        className="bg-slate-700 rounded p-1 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-[#007BFF]"
                                                                        disabled={user.role === 'SUPER_ADMIN'}
                                                                  >
                                                                        <option value="USER">USER</option>
                                                                        <option value="ADMIN">ADMIN</option>
                                                                        <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                                                                  </select>
                                                            ) : (
                                                                  <span className={`px-2 py-1 rounded text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-blue-500/30 text-blue-300' :
                                                                              user.role === 'SUPER_ADMIN' ? 'bg-purple-500/30 text-purple-300' :
                                                                                    'bg-gray-500/30 text-gray-300'
                                                                        }`}>
                                                                        {user.role}
                                                                  </span>
                                                            )}
                                                      </td>
                                                      <td className="p-4">
                                                            {loggedInUser?.role === 'SUPER_ADMIN' && user.role !== 'SUPER_ADMIN' && (
                                                                  <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700 transition-colors">Delete</button>
                                                            )}
                                                      </td>
                                                </tr>
                                          ))
                                    )}
                              </tbody>
                        </table>
                  </div>
            </div>
      );
}