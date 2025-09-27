"use client";

import { useState, useEffect, useRef } from "react";
import dynamicImport from "next/dynamic";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FaImage, FaChevronDown, FaSearch } from "react-icons/fa";
import Image from "next/image";

// Modern Markdown Editor
const MDEditor = dynamicImport(() => import("@uiw/react-md-editor"), { ssr: false });

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

// Predefined blog categories
const blogCategories = [
      "Web Development",
      "Mobile App Development",
      "Digital Marketing",
      "SEO",
      "Technology",
      "UI/UX Design",
      "Business",
      "Startup Stories",
];

// Searchable Dropdown Component
const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
      const [isOpen, setIsOpen] = useState(false);
      const [searchTerm, setSearchTerm] = useState("");
      const dropdownRef = useRef(null);

      const filteredOptions = options.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
      );

      useEffect(() => {
            const handleClickOutside = (event) => {
                  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                        setIsOpen(false);
                  }
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
                  <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full p-3 flex justify-between items-center rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora text-white"
                  >
                        <span>{value || placeholder}</span>
                        <FaChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                        <div className="absolute z-10 mt-2 w-full bg-slate-900 border border-white/10 rounded-lg shadow-lg">
                              <div className="p-2 relative">
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                          type="text"
                                          placeholder="Search category..."
                                          value={searchTerm}
                                          onChange={(e) => setSearchTerm(e.target.value)}
                                          className="w-full p-2 pl-8 bg-black/20 rounded-md focus:outline-none text-white"
                                    />
                              </div>
                              <ul className="max-h-60 overflow-y-auto">
                                    {filteredOptions.length > 0 ? (
                                          filteredOptions.map(option => (
                                                <li
                                                      key={option}
                                                      onClick={() => handleSelect(option)}
                                                      className="p-3 cursor-pointer hover:bg-[#007BFF]/20 text-white"
                                                >
                                                      {option}
                                                </li>
                                          ))
                                    ) : (
                                          <li className="p-3 text-gray-400">No category found</li>
                                    )}
                              </ul>
                        </div>
                  )}
            </div>
      );
};


export default function CreateBlogPage() {
      const [title, setTitle] = useState("");
      const [category, setCategory] = useState("");
      const [content, setContent] = useState("**Hello world!!!**");
      const [coverImage, setCoverImage] = useState(null);
      const [imagePreview, setImagePreview] = useState("");
      const [author, setAuthor] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
      const { user, loading: authLoading } = useAuth();
      const router = useRouter();

      useEffect(() => {
            if (!authLoading && !user) {
                  router.push("/login");
            }
            if (user && user.name) {
                  setAuthor(user.name);
            }
      }, [user, authLoading, router]);

      const handleImageChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                  setCoverImage(file);
                  setImagePreview(URL.createObjectURL(file));
            }
      };

      const handleSubmit = async (e) => {
            e.preventDefault();

            if (!category) {
                  setError("Please select a category.");
                  return;
            }

            setLoading(true);
            setError("");
            setSuccessMessage("");

            const token = localStorage.getItem("accessToken");
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", category);
            formData.append("content", content);
            formData.append("author", author);
            if (coverImage) {
                  formData.append("coverImage", coverImage);
            }

            try {
                  const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
                        formData,
                        {
                              headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "multipart/form-data",
                              },
                        }
                  );

                  if (response.data.success) {
                        setSuccessMessage("Blog post created successfully! It is now pending for admin approval.");
                        setTitle("");
                        setCategory("");
                        setContent("");
                        setCoverImage(null);
                        setImagePreview("");
                        e.target.reset();
                  }
            } catch (err) {
                  setError(err.response?.data?.message || "Failed to create blog post. Please try again.");
                  console.error(err);
            } finally {
                  setLoading(false);
            }
      };

      if (authLoading || !user) {
            return (
                  <main className="min-h-screen bg-transparent text-white flex items-center justify-center">
                        <p>Loading or redirecting...</p>
                  </main>
            );
      }

      return (
            <div className="container mx-auto p-4 mt-16 md:p-8">
                  <h1 className="text-3xl font-bold mb-8 text-white flex items-center gap-2 font-rajdhani">
                        <CiEdit /> Create New Blog Post
                  </h1>
                  <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                              <div>
                                    <label htmlFor="title" className="block text-white font-sora mb-2">
                                          Title
                                    </label>
                                    <input
                                          type="text"
                                          id="title"
                                          value={title}
                                          onChange={(e) => setTitle(e.target.value)}
                                          required
                                          className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora text-white"
                                    />
                              </div>
                              <div>
                                    <label htmlFor="category" className="block text-white font-sora mb-2">
                                          Category
                                    </label>
                                    <SearchableDropdown
                                          options={blogCategories}
                                          value={category}
                                          onChange={setCategory}
                                          placeholder="Select a category"
                                    />
                              </div>
                        </div>

                        <div>
                              <label className="block text-white font-sora mb-2">Cover Image</label>
                              <div className="mt-2 flex justify-center items-center w-full px-6 pt-5 pb-6 border-2 border-white/20 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                          {imagePreview ? (
                                                <Image src={imagePreview} alt="Cover preview" width={400} height={200} className="mx-auto h-48 w-auto rounded-md object-cover" />
                                          ) : (
                                                <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                                          )}
                                          <div className="flex text-sm text-gray-400 justify-center">
                                                <label htmlFor="coverImage" className="relative cursor-pointer bg-black/30 rounded-md font-medium text-[#007BFF] hover:text-blue-400 focus-within:outline-none p-2">
                                                      <span>Upload a file</span>
                                                      <input id="coverImage" name="coverImage" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                                </label>
                                                <p className="pl-1 self-center">or drag and drop</p>
                                          </div>
                                          <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                                    </div>
                              </div>
                        </div>

                        <div>
                              <label className="block text-white font-sora mb-2">
                                    Content
                              </label>
                              <div data-color-mode="dark">
                                    <MDEditor
                                          height={400}
                                          value={content}
                                          onChange={setContent}
                                          preview="edit" // <-- এই পরিবর্তনটি করা হয়েছে
                                    />
                              </div>
                        </div>

                        {error && (
                              <p className="text-red-500 text-center font-sora">{error}</p>
                        )}
                        {successMessage && (
                              <p className="text-green-500 text-center font-sora">{successMessage}</p>
                        )}
                        <div>
                              <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-auto inline-block px-10 py-4 text-lg font-semibold text-black bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-white disabled:bg-gray-600 disabled:cursor-not-allowed font-sora"
                              >
                                    {loading ? "Creating..." : "Create Blog Post"}
                              </button>
                        </div>
                  </form>
            </div>
      );
}