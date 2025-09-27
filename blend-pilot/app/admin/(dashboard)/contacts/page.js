"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export default function ContactsPage() {
  const { user, loading: authLoading } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && !authLoading) {
      fetchContacts();
    }
  }, [user, authLoading]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setContacts(result.data);
      } else {
        throw new Error("Failed to fetch contacts");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateContactStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Update local state
        setContacts(contacts.map(contact => 
          contact._id === id ? { ...contact, status: newStatus } : contact
        ));
      }
    } catch (err) {
      console.error('Failed to update contact status:', err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#010409] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007BFF] mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#010409] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
          <p className="text-gray-400 mt-2">Please log in to view contacts.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#010409] text-white p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-rajdhani">Contact Messages</h1>
          <p className="text-gray-400 font-sora">Manage contact form submissions</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-slate-900/50 border border-blue-500/20 rounded-lg overflow-hidden">
          {contacts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No contact messages yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-slate-800/30">
                      <td className="px-6 py-4 text-sm text-white font-medium">{contact.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{contact.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{contact.message}</td>
                      <td className="px-6 py-4">
                        <select
                          value={contact.status}
                          onChange={(e) => updateContactStatus(contact._id, e.target.value)}
                          className="bg-slate-700 border border-gray-600 text-white text-sm rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your message to BlendPilot&body=Hi ${contact.name},%0D%0A%0D%0AThank you for contacting us.%0D%0A%0D%0AYour message: "${contact.message}"%0D%0A%0D%0ABest regards,%0D%0ABlendPilot Team`)}
                          className="text-[#007BFF] hover:text-blue-400 transition-colors"
                        >
                          Reply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
