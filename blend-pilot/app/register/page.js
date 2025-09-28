"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Modal from '../components/Modal';
import { useAuth } from "../context/AuthContext";

// Disable static generation to prevent build errors
export const dynamic = 'force-dynamic';

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const router = useRouter();
  const { register, user, loading: authLoading } = useAuth();

  const [password, setPassword] = useState("");
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  // Redirect if user is already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check for at least one uppercase letter
    setHasUppercase(/[A-Z]/.test(newPassword));

    // Check for at least one number
    setHasNumber(/\d/.test(newPassword));

    // Check for at least one special character (!@#$%^&*)
    setHasSpecialChar(/[!@#$%^&*]/.test(newPassword));
  };

  const handleFocus = () => {
    setShowPasswordValidation(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setModalOpen(false);

    // Frontend validation check
    if (!hasUppercase || !hasNumber || !hasSpecialChar) {
      setError("Please meet all password requirements before submitting.");
      setLoading(false);
      return;
    }

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: password,
    };

    try {
      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        setModalMessage("Registration successful! You have been logged in and redirected to the home page.");
        setModalOpen(true);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    router.push("/");
  };

  if (authLoading || user) {
    return (
      <main className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </main>
    );
  }

  const isFormValid = hasUppercase && hasNumber && hasSpecialChar;

  return (
    <main className="min-h-screen bg-transparent text-white flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-2 font-rajdhani">
          Register
        </h1>
        <p className="text-gray-400 mb-6 font-sora">
          Create a new account to get started with our services.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora"
            />
          </div>
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
              value={password}
              onChange={handlePasswordChange}
              onFocus={handleFocus}
              className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora"
            />
            {showPasswordValidation && (
              <div className="mt-2 text-left text-sm font-sora space-y-1">
                <div className={`flex items-center space-x-2 ${hasUppercase ? 'text-green-500' : 'text-red-500'}`}>
                  <i className={`fas ${hasUppercase ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  <span>Must contain at least one uppercase letter</span>
                </div>
                <div className={`flex items-center space-x-2 ${hasNumber ? 'text-green-500' : 'text-red-500'}`}>
                  <i className={`fas ${hasNumber ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  <span>Must contain at least one number</span>
                </div>
                <div className={`flex items-center space-x-2 ${hasSpecialChar ? 'text-green-500' : 'text-red-500'}`}>
                  <i className={`fas ${hasSpecialChar ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                  <span>Must contain at least one special character (!@#$%^&*)</span>
                </div>
              </div>
            )}
          </div>
          {error && (
            <p className="text-red-500 text-center font-sora">{error}</p>
          )}
          <div>
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full inline-block px-10 py-4 text-lg font-semibold text-black rounded-lg transition-all duration-300 ease-in-out font-sora
              ${isFormValid ? 'bg-[#007BFF] hover:bg-white' : 'bg-gray-600 cursor-not-allowed'}`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-gray-400 mt-6 font-sora">
          Already have an account?{" "}
          <Link href="/login" className="text-[#007BFF] hover:underline">
            Login here
          </Link>
        </p>
      </div>
      {modalOpen && (
        <Modal onClose={handleModalClose}>
          <div className="text-center p-4">
            <h2 className="text-2xl font-bold mb-4">Registration Status</h2>
            <p>{modalMessage}</p>
            <button
              onClick={handleModalClose}
              className="mt-4 px-4 py-2 bg-[#007BFF] text-white rounded-md hover:bg-blue-400"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}
