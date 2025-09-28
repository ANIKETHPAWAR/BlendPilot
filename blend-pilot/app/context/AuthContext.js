"use client";

import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
      const router = useRouter();
      const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

      const fetchMe = useCallback(async (token) => {
            setLoading(true);
            try {
                  const response = await axios.get(`${BASE_URL}/auth/getme`, {
                        headers: {
                              Authorization: `Bearer ${token}`,
                        },
                  });
                  if (response.data.success) {
                        setUser(response.data.data);
                  } else {
                        localStorage.removeItem("accessToken");
                        setUser(null);
                  }
            } catch (error) {
                  console.error("Failed to fetch user data:", error);
                  localStorage.removeItem("accessToken");
                  setUser(null);
            } finally {
                  setLoading(false);
            }
      }, [BASE_URL]);

      useEffect(() => {
            const token = localStorage.getItem("accessToken");
            if (token) {
                  fetchMe(token);
            } else {
                  setLoading(false);
            }
      }, [fetchMe]);

      const login = async (email, password) => {
            setLoading(true);
            try {
                  const response = await axios.post(`${BASE_URL}/auth/login`, {
                        email,
                        password,
                  });
                  if (response.data.success) {
                        const token = response.data.data.accessToken;
                        localStorage.setItem("accessToken", token);
                        setUser(response.data.data.user);
                        const userRole = response.data.data.user.role;
                        if (userRole === "SUPER_ADMIN" || userRole === "ADMIN") {
                              router.push("/admin");
                        } else {
                              router.push("/");
                        }
                        return response.data;
                  } else {
                        setLoading(false);
                        return { success: false, message: response.data.message || "Login failed" };
                  }
            } catch (error) {
                  setLoading(false);
                  if (error.code === 'NETWORK_ERROR' || !error.response) {
                        return { success: false, message: "Network error. Please check your connection and try again." };
                  }
                  return { success: false, message: error.response?.data?.message || "Login failed" };
            }
      };

      const register = async (name, email, password) => {
            setLoading(true);
            try {
                  const response = await axios.post(`${BASE_URL}/user/register`, {
                        name,
                        email,
                        password,
                  });
                  if (response.data.success) {
                        await login(email, password);
                        return response.data;
                  } else {
                        setLoading(false);
                        return { success: false, message: response.data.message || "Registration failed" };
                  }
            } catch (error) {
                  setLoading(false);
                  if (error.code === 'NETWORK_ERROR' || !error.response) {
                        return { success: false, message: "Network error. Please check your connection and try again." };
                  }
                  return { success: false, message: error.response?.data?.message || "Registration failed" };
            }
      };

      const logout = () => {
            localStorage.removeItem("accessToken");
            setUser(null);
            router.push("/login");
      };

      return (
            <AuthContext.Provider value={{ user, loading, login, register, logout, fetchMe, setUser }}>
                  {children}
            </AuthContext.Provider>
      );
};

export const useAuth = () => useContext(AuthContext);