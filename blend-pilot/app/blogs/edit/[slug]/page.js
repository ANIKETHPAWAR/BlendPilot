"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "../../../context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import { FaChevronDown, FaSearch, FaImage, FaEdit } from "react-icons/fa";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const blogCategories = ["Web Development", "Mobile App Development", "Digital Marketing", "SEO", "Technology", "UI/UX Design", "Business", "Startup Stories"];

const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState("");
      const dropdownRef = useRef(null);
      const filteredOptions = options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()));

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const handleSelect = (option) => {
            onChange(option);
            setIsOpen(false);
            setSearchTerm("");
      };

      return (
            <div className="relative w-full" ref={dropdownRef}>
                  <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full p-3 flex justify-between items-center rounded-lg bg-black/30 border border-white/10 text-white">
                        <span>{value || placeholder}</span>
                        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-slate-900 border border-white/10 rounded-lg shadow-lg">
                              <div className="p-2 relative">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full p-2 pl-8 bg-black/20 rounded-md text-white" />
                              </div>
                              <ul className="max-h-60 overflow-y-auto">
                                    {filteredOptions.map(option => <li key={option} onClick={() => handleSelect(option)} className="p-3 cursor-pointer hover:bg-[#007BFF]/20 text-white">{option}</li>)}
                              </ul>
                        </div>
                  )}
            </div>
      );
};

export default function EditBlogPage() {
      const { slug } = useParams();
      const router = useRouter();
      const { user, loading: authLoading } = useAuth();

      const [title, setTitle] = useState('');
      const [category, setCategory] = useState('');
      const [content, setContent] = useState('');
      const [coverImage, setCoverImage] = useState(null);
      const [imagePreview, setImagePreview] = useState('');
      const [loading, setLoading] = useState(false);
      const [pageLoading, setPageLoading] = useState(true);
      const [error, setError] = useState('');
      const [successMessage, setSuccessMessage] = useState('');

      useEffect(() => {
            if (!slug) return;
            const fetchBlogData = async () => {
                  try {
                        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
                        const blog = data.data;

                        if (user && blog.createdBy !== user._id && (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
                              setError("You are not authorized to edit this post.");
                              router.push('/profile');
                              return;
                        }

                        setTitle(blog.title);
                        setCategory(blog.category);
                        setContent(blog.content);
                        setImagePreview(blog.coverImage);
                  } catch (err) {
                        setError("Failed to fetch blog data or you don't have permission.");
                  } finally {
                        setPageLoading(false);
                  }
            };
            if (user) fetchBlogData();
      }, [slug, user, router]);

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setCoverImage(file);
                  setImagePreview(URL.createObjectURL(file));
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');
            setSuccessMessage('');

            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('content', content);
            if (coverImage) {
                  formData.append('coverImage', coverImage);
            }

            try {
                  const token = localStorage.getItem('accessToken');
                  await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`, formData, {
                        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
                  });
                  setSuccessMessage("Blog updated successfully!");
                  router.push('/profile');
            } catch (err) {
                  setError("Failed to update blog.");
            } finally {
                  setLoading(false);
            }
      };

      if (pageLoading || authLoading) return <div className="text-center py-40 text-white">Loading Editor...</div>;
      if (error) return <div className="text-center py-40 text-red-500">{error}</div>

      return (
            <div className="container mx-auto p-4 mt-16 md:p-8">
                  <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2 font-rajdhani"><FaEdit /> Edit Blog Post</h1>
                  <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                    <label htmlFor="title" className="block text-white font-sora mb-2">Title</label>
                                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora text-white" />
                              </div>
                              <div>
                                    <label htmlFor="category" className="block text-white font-sora mb-2">Category</label>
                                    <SearchableDropdown options={blogCategories} value={category} onChange={setCategory} placeholder="Select a category" />
                              </div>
                        </div>
                        <div>
                              <label className="block text-white font-sora mb-2">Cover Image</label>
                              <div className="mt-2 flex justify-center items-center w-full px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                          {imagePreview ? <Image src={imagePreview} alt="Cover preview" width={400} height={200} className="mx-auto h-48 w-auto rounded-md object-cover" /> : <FaImage className="mx-auto h-12 w-12 text-gray-400" />}
                                          <div className="flex text-sm text-gray-400 justify-center">
                                                <label htmlFor="coverImage" className="relative cursor-pointer bg-black/30 rounded-md font-medium text-[#007BFF] hover:text-blue-400 focus-within:outline-none p-2">
                                                      <span>Change Image</span>
                                                      <input id="coverImage" name="coverImage" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                                </label>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div>
                              <label className="block text-white font-sora mb-2">Content</label>
                              <div data-color-mode="dark">
                                    <MDEditor height={400} value={content} onChange={setContent} preview="edit" />
                              </div>
                        </div>
                        {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <div>
                              <button type="submit" disabled={loading} className="w-full md:w-auto inline-block px-10 py-4 text-lg font-semibold text-black bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-white disabled:bg-gray-600">
                                    {loading ? "Updating..." : "Update Blog Post"}
                              </button>
                        </div>
                  </form>
            </div>
      );
}