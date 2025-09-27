"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Image from "next/image";
import { FaCamera } from "react-icons/fa";

const ProfileSettings = () => {
      const { user, setUser } = useAuth();
      const [name, setName] = useState('');
      const [picture, setPicture] = useState(null);
      const [preview, setPreview] = useState('');
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState('');

      useEffect(() => {
            if (user) {
                  setName(user.name || '');
                  setPreview(user.picture || '');
            }
      }, [user]);

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setPicture(file);
                  setPreview(URL.createObjectURL(file));
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setMessage('');

            const formData = new FormData();
            formData.append('name', name);
            if (picture) {
                  formData.append('picture', picture);
            }

            try {
                  const token = localStorage.getItem('accessToken');
                  const response = await axios.patch(
                        `${process.env.NEXT_PUBLIC_API_URL}/user/update-my-profile`,
                        formData,
                        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
                  );
                  if (response.data.success) {
                        setMessage('Profile updated successfully!');
                        setUser(response.data.data);
                  }
            } catch (error) {
                  setMessage('Failed to update profile.');
                  console.error(error);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <div>
                  <h2 className="text-2xl font-bold mb-6 font-rajdhani">Profile Settings</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex items-center gap-6">
                              <div className="relative">
                                    <Image
                                          src={preview || `https://ui-avatars.com/api/?name=${name || 'User'}&background=0D8ABC&color=fff&size=80`}
                                          alt="Profile"
                                          width={80}
                                          height={80}
                                          className="rounded-full object-cover border-2 border-white/20"
                                    />
                                    <label htmlFor="picture" className="absolute bottom-0 right-0 bg-[#007BFF] p-2 rounded-full cursor-pointer hover:bg-blue-600">
                                          <FaCamera className="text-white" />
                                          <input type="file" id="picture" onChange={handleImageChange} className="sr-only" accept="image/*" />
                                    </label>
                              </div>
                        </div>
                        <div>
                              <label htmlFor="name" className="block mb-2 font-sora">Full Name</label>
                              <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora text-white" />
                        </div>
                        <div>
                              <label htmlFor="email" className="block mb-2 font-sora">Email (Cannot be changed)</label>
                              <input type="email" id="email" value={user?.email || ''} disabled className="w-full p-3 rounded-lg bg-black/50 border border-white/10 cursor-not-allowed font-sora text-gray-400" />
                        </div>
                        <button type="submit" disabled={loading} className="px-6 py-2 bg-[#007BFF] rounded hover:bg-blue-600 transition-colors disabled:bg-gray-600">
                              {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        {message && <p className={`mt-4 ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
                  </form>
            </div>
      );
};

export default ProfileSettings;