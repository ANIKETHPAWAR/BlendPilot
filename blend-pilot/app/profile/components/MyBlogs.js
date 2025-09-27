"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMyBlogs = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/my-blogs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBlogs(response.data.data);
        } catch (error) {
            console.error("Failed to fetch my blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
            try {
                const token = localStorage.getItem('accessToken');
                await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchMyBlogs();
            } catch (error) {
                console.error("Failed to delete blog:", error);
            }
        }
    };

    if (loading) return <p>Loading your blogs...</p>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 font-rajdhani">My Blogs</h2>
            <div className="space-y-4">
                {blogs.length > 0 ? blogs.map(blog => (
                    <div key={blog._id} className="bg-slate-800/50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="font-semibold text-white">{blog.title}</h3>
                            <p className={`text-sm mt-1 px-2 py-0.5 inline-block rounded-full ${
                                blog.status === 'APPROVED' ? 'bg-green-500/30 text-green-300' :
                                blog.status === 'PENDING' ? 'bg-yellow-500/30 text-yellow-300' :
                                'bg-red-500/30 text-red-300'
                            }`}>Status: {blog.status}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                             <Link href={`/blogs/edit/${blog._id}`} className="p-2 rounded-full hover:bg-blue-600 transition-colors"><FaEdit /></Link>
                            <button onClick={() => handleDelete(blog._id)} className="p-2 rounded-full hover:bg-red-600 transition-colors"><FaTrash /></button>
                        </div>
                    </div>
                )) : <p className="text-gray-400">You have not created any blogs yet. <Link href="/blogs/create" className="text-[#007BFF] hover:underline">Create one now!</Link></p>}
            </div>
        </div>
    );
};

export default MyBlogs;