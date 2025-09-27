"use client";

import { useState, useEffect } from "react";
import dynamicImport from "next/dynamic";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";

// Dynamically import SimpleMdeEditor to prevent SSR issues
const SimpleMdeEditor = dynamicImport(() => import("react-simplemde-editor"), { ssr: false });

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';
import "easymde/dist/easymde.min.css";

export default function CreateBlogPage() {
      const [title, setTitle] = useState("");
      const [content, setContent] = useState("");
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState("");
      const [successMessage, setSuccessMessage] = useState("");
      const { user, loading: authLoading } = useAuth();
      const router = useRouter();

      // Redirect if not authenticated or not an admin
      useEffect(() => {
            if (!authLoading && (!user || (user.role !== "SUPER_ADMIN" && user.role !== "ADMIN"))) {
                  router.push("/login");
            }
      }, [user, authLoading, router]);

      const handleEditorChange = (value) => {
            setContent(value);
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            setSuccessMessage("");

            // Here you would add logic to send the blog post data to your backend API.
            // Example:
            /*
            try {
              const response = await axios.post("/api/v1/blogs", { title, content }, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
              });
              if (response.data.success) {
                setSuccessMessage("Blog post created successfully!");
                setTitle("");
                setContent("");
              }
            } catch (err) {
              setError("Failed to create blog post. Please try again.");
              console.error(err);
            } finally {
              setLoading(false);
            }
            */
            setLoading(false);
            setSuccessMessage("Form submitted successfully! (Backend API not connected yet)");
      };

      if (authLoading || (user && user.role !== "SUPER_ADMIN" && user.role !== "ADMIN")) {
            return (
                  <main className="min-h-screen bg-transparent text-white flex items-center justify-center">
                        <p>Loading or redirecting...</p>
                  </main>
            );
      }

      return (
            <div className="container mx-auto p-4 md:p-8">
                  <h1 className="text-3xl font-bold mb-6 text-white font-orbitron">Create New Blog Post</h1>
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                              <label htmlFor="content" className="block text-white font-sora mb-2">
                                    Content (Markdown)
                              </label>
                              <SimpleMdeEditor
                                    value={content}
                                    onChange={handleEditorChange}
                                    options={{
                                          spellChecker: false,
                                          hideIcons: ["guide", "fullscreen"],
                                          placeholder: "Start writing your blog content here...",
                                    }}
                              />
                        </div>

                        <div className="bg-black/30 border border-white/10 rounded-lg p-4">
                              <h2 className="text-white font-sora mb-2 text-xl font-bold">Preview</h2>
                              <div className="prose prose-invert max-w-none text-white font-sora">
                                    <ReactMarkdown>{content}</ReactMarkdown>
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