import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

async function getPost(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const excerpt = post.content.substring(0, 160).replace(/\s+/g, " ").trim();
  const postUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${params.slug}`;

  return {
    title: `${post.title} | Blend Pilot`,
    description: excerpt,
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: excerpt,
      url: postUrl,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      type: "article",
      publishedTime: post.createdAt,
      author: post.author,
    },
  };
}

export default async function BlogDetailsPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="bg-transparent text-white pt-24">
      <div className="container mx-auto max-w-4xl px-6 py-12 lg:py-16">
        <header className="text-center mb-12">
          <Link
            href="/blogs"
            className="text-sm uppercase font-bold text-[#007BFF] tracking-[0.2em] font-sora"
          >
            {post.category}
          </Link>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mt-4 text-balance font-rajdhani"
            style={{ textShadow: "0 0 15px rgba(0, 123, 255, 0.5)" }}
          >
            {post.title}
          </h1>
          <div className="flex justify-center items-center gap-6 text-md text-gray-400 mt-6 font-sora">
            <div className="flex items-center gap-2">
              <FaUser className="text-[#007BFF]" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#007BFF]" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <figure className="mb-12">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={600}
            priority
            className="w-full h-auto rounded-xl shadow-lg shadow-black/30"
          />
        </figure>

        <article className="prose prose-invert prose-lg mx-auto max-w-full text-gray-300">
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {post.content}
          </ReactMarkdown>
        </article>

        <section className="pt-12 mt-12 text-center border-t border-blue-500/10">
          <Link
            href="/blogs"
            className="inline-block px-10 py-4 text-lg font-semibold text-[#007BFF] border-2 border-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-[#007BFF] hover:text-white"
          >
            &larr; Back to All Blogs
          </Link>
        </section>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?status=APPROVED`);
    const result = await res.json();
    const posts = result.data || [];
    return posts.map((post) => ({
      slug: post._id,
    }));
  } catch (error) {
    console.error("Could not fetch posts for static generation:", error);
    return [];
  }
}