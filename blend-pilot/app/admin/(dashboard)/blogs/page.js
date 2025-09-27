"use client";

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export default function BlogManagement() {
      const [blogs, setBlogs] = useState([]);
      const [filter, setFilter] = useState('');
      const [loading, setLoading] = useState(true);

      const fetchBlogs = useCallback(async () => {
            setLoading(true);
            try {
                  const token = localStorage.getItem('accessToken');
                  const url = filter
                        ? `${process.env.NEXT_PUBLIC_API_URL}/blogs?status=${filter}`
                        : `${process.env.NEXT_PUBLIC_API_URL}/blogs`;
                  const response = await axios.get(url, {
                        headers: { Authorization: `Bearer ${token}` },
                  });
                  setBlogs(response.data.data);
            } catch (error) {
                  console.error("Failed to fetch blogs:", error);
            } finally {
                  setLoading(false);
            }
      }, [filter]);

      useEffect(() => {
            fetchBlogs();
      }, [filter, fetchBlogs]);

      const handleStatusChange = async (id, status) => {
            try {
                  const token = localStorage.getItem('accessToken');
                  await axios.patch(
                        `${process.env.NEXT_PUBLIC_API_URL}/blogs/status/${id}`,
                        { status },
                        { headers: { Authorization: `Bearer ${token}` } }
                  );
                  fetchBlogs();
            } catch (error) {
                  console.error("Failed to update status:", error);
            }
      };

      const handleDelete = async (id) => {
            if (window.confirm("Are you sure you want to delete this blog?")) {
                  try {
                        const token = localStorage.getItem('accessToken');
                        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
                              headers: { Authorization: `Bearer ${token}` },
                        });
                        fetchBlogs();
                  } catch (error) {
                        console.error("Failed to delete blog:", error);
                  }
            }
      };

      const tabs = ['', 'PENDING', 'APPROVED', 'REJECTED'];

      return (
            <div>
                  <h1 className="text-4xl font-bold font-rajdhani mb-8">Blog Management</h1>
                  <div className="flex space-x-4 mb-6 border-b border-white/10">
                        {tabs.map(tab => (
                              <button
                                    key={tab}
                                    onClick={() => setFilter(tab)}
                                    className={`px-4 py-2 font-semibold transition-colors duration-200 ${filter === tab ? 'border-b-2 border-[#007BFF] text-[#007BFF]' : 'text-gray-400'}`}
                              >
                                    {tab === '' ? 'All' : tab}
                              </button>
                        ))}
                  </div>
                  <div className="bg-slate-900/50 rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                              <table className="w-full text-left">
                                    <thead className="bg-slate-800">
                                          <tr>
                                                <th className="p-4">Title</th>
                                                <th className="p-4">Author</th>
                                                <th className="p-4">Category</th>
                                                <th className="p-4">Status</th>
                                                <th className="p-4">Actions</th>
                                          </tr>
                                    </thead>
                                    <tbody>
                                          {loading ? (
                                                <tr><td colSpan="5" className="p-4 text-center">Loading blogs...</td></tr>
                                          ) : (
                                                blogs.map(blog => (
                                                      <tr key={blog._id} className="border-b border-slate-800 hover:bg-slate-800/50">
                                                            <td className="p-4 font-semibold text-white">{blog.title}</td>
                                                            <td className="p-4 text-gray-300">{blog.author}</td>
                                                            <td className="p-4 text-gray-300">{blog.category}</td>
                                                            <td className="p-4">
                                                                  <select
                                                                        value={blog.status}
                                                                        onChange={(e) => handleStatusChange(blog._id, e.target.value)}
                                                                        className={`rounded p-1 border text-sm focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-slate-700 text-white ${blog.status === 'APPROVED' ? 'border-green-500/50' :
                                                                                    blog.status === 'PENDING' ? 'border-yellow-500/50' :
                                                                                          'border-red-500/50'
                                                                              }`}
                                                                  >
                                                                        <option className="bg-slate-800 text-white" value="PENDING">PENDING</option>
                                                                        <option className="bg-slate-800 text-white" value="APPROVED">APPROVED</option>
                                                                        <option className="bg-slate-800 text-white" value="REJECTED">REJECTED</option>
                                                                  </select>
                                                            </td>
                                                            <td className="p-4 flex items-center space-x-2">
                                                                  <Link href={`/blogs/${blog._id}`} target="_blank" className="p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition-colors" title="View Blog">
                                                                        <FaEye />
                                                                  </Link>
                                                                  <button
                                                                        onClick={() => handleDelete(blog._id)}
                                                                        className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700 transition-colors"
                                                                  >
                                                                        Delete
                                                                  </button>
                                                            </td>
                                                      </tr>
                                                ))
                                          )}
                                    </tbody>
                              </table>
                        </div>
                  </div>
            </div>
      );
}