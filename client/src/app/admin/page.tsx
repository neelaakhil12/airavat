"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Image as ImageIcon, CreditCard, TrendingUp, DollarSign } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axios.get(`${API_URL}/admin/analytics`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(data);
        } catch (error) {
            toast.error('Failed to load analytics');
        } finally {
            setLoading(false);
        }
    };

    const cards = [
        { title: 'Total Users', value: stats?.totalUsers || 0, icon: Users, color: 'text-blue-500', trend: '+12%' },
        { title: 'Pro Subscribers', value: stats?.totalSubscribed || 0, icon: CreditCard, color: 'text-green-500', trend: '+5%' },
        { title: 'Images Generated', value: stats?.totalImages || 0, icon: ImageIcon, color: 'text-purple-500', trend: '+18%' },
        { title: 'Total Revenue', value: `₹${stats?.revenue || 0}`, icon: DollarSign, color: 'text-primary', trend: '+10%' },
    ];

    return (
        <div className="space-y-10 bg-white">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Platform Overview</h1>
                <p className="text-gray-600 font-medium">Monitor and manage your AI Image SaaS</p>
            </header>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading stats...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={card.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass bg-white p-6 rounded-3xl border border-gray-100 relative overflow-hidden group hover:shadow-xl transition-all"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Icon size={80} className="text-black" />
                                </div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-2xl bg-gray-50 ${card.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{card.trend}</span>
                                </div>
                                <h3 className="text-gray-500 text-sm font-bold uppercase tracking-widest">{card.title}</h3>
                                <p className="text-2xl font-bold mt-1 text-gray-900 tracking-tight">{card.value}</p>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass bg-white rounded-[2.5rem] border border-gray-100 p-8 hover:shadow-2xl transition-all">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-gray-900">Growth Analytics</h2>
                        <div className="flex gap-2">
                             <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-200">7 Days</button>
                             <button className="px-3 py-1 bg-primary text-black rounded-lg text-xs font-bold shadow-lg shadow-primary/20">30 Days</button>
                        </div>
                    </div>
                    <div className="aspect-[2/1] w-full bg-gray-50 rounded-2xl flex items-center justify-center border border-dashed border-gray-200">
                        <div className="flex flex-col items-center text-gray-400">
                             <TrendingUp size={48} className="mb-2 opacity-20" />
                             <span className="text-sm font-bold uppercase tracking-widest">Growth Visualization</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 glass bg-white rounded-[2.5rem] border border-gray-100 p-8 hover:shadow-2xl transition-all">
                    <h2 className="text-xl font-bold mb-6 text-gray-900">Recent Activity</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">U</div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">New User registered</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">2 mins ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
