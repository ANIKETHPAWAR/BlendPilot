"use client";

import { MdOutlinePostAdd } from "react-icons/md";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

const SkeletonCard = () => (
  <div className="glass-card rounded-2xl overflow-hidden h-full flex flex-col animate-pulse">
    <div className="w-full h-52 bg-slate-800"></div>
    <div className="p-6 flex flex-col flex-grow">
      <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
      <div className="h-6 bg-slate-700 rounded w-full mb-3"></div>
      <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-slate-700 rounded w-full mb-4"></div>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-cyan-400/10">
        <div className="h-4 bg-slate-700 rounded w-1/3"></div>
        <div className="h-4 bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
  </div>
);

export default function BlogsPage() {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs?status=APPROVED`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
        }
        const result = await response.json();
        setAllPosts(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const featuredPost = allPosts[0];
  const otherPosts = allPosts.slice(1);

  return (
    <main className="bg-transparent text-white">
      <section className="relative pt-32 pb-16 text-center overflow-hidden border-b border-cyan-400/20">
        <div className="container mx-auto px-6 relative z-10 flex justify-between items-center">
          <div>
            <p className="text-sm uppercase font-bold text-[#00cdf3] tracking-[0.2em]">
              Our Blog
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold text-white mt-4 font-rajdhani" style={{ textShadow: "0 0 15px rgba(0, 205, 243, 0.5)" }}>
              Insights & Innovations
            </h1>
          </div>
          <Link
            href={user ? "/blogs/create" : "/login"}
            className="hidden md:inline-flex items-center gap-2 px-6 py-3 text-md font-semibold text-black bg-[#00cdf3] rounded-lg transition-all duration-300 ease-in-out hover:bg-white"
          >
            <MdOutlinePostAdd /> Post a Blog
          </Link>
        </div>
      </section>

      {error && (
        <div className="text-center py-20 text-red-500">Error: {error}</div>
      )}

      {isLoading && (
        <div className="py-16 px-6 container mx-auto">
          <div className="animate-pulse glass-card rounded-2xl grid lg:grid-cols-2 gap-12 items-center">
            <div className="w-full h-96 bg-slate-800 rounded-l-2xl"></div>
            <div className="p-8 md:p-12">
              <div className="h-4 bg-slate-700 rounded w-1/4 mb-4"></div>
              <div className="h-8 bg-slate-700 rounded w-full mb-3"></div>
              <div className="h-8 bg-slate-700 rounded w-5/6 mb-6"></div>
              <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-4 bg-slate-700 rounded w-1/2 mb-6"></div>
              <div className="h-12 bg-slate-700 rounded w-1/3"></div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && featuredPost && (
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <Link
              href={`/blogs/${featuredPost._id}`}
              className="grid lg:grid-cols-2 gap-12 items-center glass-card rounded-2xl overflow-hidden group"
            >
              <div className="w-full h-96 overflow-hidden">
                <Image
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="p-8 md:p-12">
                <p className="text-sm font-semibold text-[#00cdf3] mb-2">
                  {featuredPost.category}
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance group-hover:text-cyan-300 transition-colors duration-300">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-400 mb-6 line-clamp-3">
                  {featuredPost.content.replace(/<[^>]*>?/gm, '')}
                </p>
                <div className="text-sm text-gray-500 mb-6">
                  <span>By {featuredPost.author}</span> &bull;{" "}
                  <span>
                    {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </span>
                </div>
                <span className="font-semibold text-black bg-[#00cdf3] px-8 py-3 rounded-lg transition-all duration-300 group-hover:bg-white">
                  Read Full Story
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="py-20 lg:py-32 px-6 bg-slate-900/50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-balance text-center">
            Latest Articles
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            ) : (
              otherPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blogs/${post._id}`}
                  className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group"
                >
                  <div className="overflow-hidden relative">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={600}
                      height={400}
                      className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                    <p className="absolute bottom-4 left-4 text-xs font-semibold text-white bg-cyan-500/80 px-3 py-1 rounded-full">
                      {post.category}
                    </p>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-3 text-balance flex-grow group-hover:text-cyan-300 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {post.content.replace(/<[^>]*>?/gm, '')}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-cyan-400/10">
                      <div className="text-xs text-gray-500">
                        <span>{post.author}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#00cdf3] group-hover:text-white">
                        Read More &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          {!isLoading && allPosts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-400">No blog posts found.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}