"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, CreditCard, Mail, Calendar, Search } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/admin/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(data);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = users.filter((user: any) => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10 bg-white min-h-screen">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600 font-medium">View and manage platform users and subscriptions</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                        type="text"
                        placeholder="Search emails..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-primary transition-all text-sm w-80 shadow-sm"
                    />
                </div>
            </header>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading users...</div>
            ) : (
                <div className="glass bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-2xl shadow-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">User Details</th>
                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Access Role</th>
                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500">Subscription</th>
                                <th className="px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 text-right pr-12">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredUsers.map((user: any) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-6 font-medium">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-extrabold shadow-sm">
                                                {user.email[0].toUpperCase()}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-gray-900 font-bold">{user.email}</span>
                                                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Customer ID: {user._id.slice(-6)}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center space-x-2">
                                            {user.role === 'admin' ? (
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                                    <Shield size={12} /> Administrator
                                                </span>
                                            ) : (
                                                <span className="text-[10px] font-black text-gray-500 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full uppercase tracking-widest">Standard User</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        {user.isSubscribed ? (
                                            <span className="flex items-center gap-1.5 text-[10px] font-black text-green-600 bg-green-50 border border-green-100 px-3 py-1.5 rounded-full uppercase tracking-widest">
                                                <CreditCard size={12} /> Diamond Tier
                                            </span>
                                        ) : (
                                            <span className="text-[10px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full uppercase tracking-widest">Trial Access</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-6 text-right pr-12">
                                        <button className="text-xs font-black text-primary hover:text-black uppercase tracking-widest transition-colors">View Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;
