"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
        router.push("/");
      } else {
        router.push("/");
      }
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await login(email, password);
      if (result.success) {
        // Redirection is handled by the login function in AuthContext
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || user) {
    return (
      <main className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">
          Login
        </h1>
        <p className="text-gray-400 mb-6 font-sora">
          Welcome back! Please log in to your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email Address"
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora"
            />
          </div>
          {error && (
            <p className="text-red-500 text-center font-sora">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-block px-10 py-4 text-lg font-semibold text-black bg-[#007BFF] rounded-lg transition-all duration-300 ease-in-out hover:bg-white disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-gray-400 mt-6 font-sora">
          {"Don't have an account? "}
          <Link href="/register" className="text-[#007BFF] hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </main>
  );
}