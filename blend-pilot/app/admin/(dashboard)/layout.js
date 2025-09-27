"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
      const { user, loading } = useAuth();
      const router = useRouter();

      useEffect(() => {
            if (!loading && (!user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN"))) {
                  router.push('/login');
            }
      }, [user, loading, router]);

      if (loading || !user || (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN")) {
            return (
                  <div className="flex items-center justify-center min-h-screen bg-[#010409]">
                        <p className="text-white">Loading or redirecting...</p>
                  </div>
            );
      }

      return (
            <div className="flex min-h-screen bg-[#010409] text-white">
                  <Sidebar />
                  <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64">
                        {children}
                  </main>
            </div>
      );
}