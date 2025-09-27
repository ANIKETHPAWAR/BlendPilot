"use client";

import { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
             setMessage("Password must be at least 6 characters long.");
             return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('accessToken');
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/user/update-my-profile`,
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage('Password changed successfully!');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage('Failed to change password.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 font-rajdhani">Change Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="password" className="block mb-2 font-sora">New Password</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora text-white" required/>
                </div>
                <div>
                    <label htmlFor="confirmPassword"  className="block mb-2 font-sora">Confirm New Password</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-3 rounded-lg bg-black/30 border border-white/10 focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/50 focus:outline-none transition-colors font-sora text-white" required/>
                </div>
                <button type="submit" disabled={loading} className="px-6 py-2 bg-[#007BFF] rounded hover:bg-blue-600 transition-colors disabled:bg-gray-600">
                    {loading ? 'Changing...' : 'Change Password'}
                </button>
                {message && <p className={`mt-4 ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{message}</p>}
            </form>
        </div>
    );
};

export default ChangePassword;