"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CreditCard, Key, Image as ImageIcon, Zap } from 'lucide-react';
import axios from 'axios';

const DashboardPage = () => {
    const [user, setUser] = useState<any>(null);
    const [stats, setStats] = useState({ images: 0 });

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));
        
        // Fetch real-time stats here later
    }, []);

    const cards = [
        { 
            title: 'Subscription', 
            value: user?.isSubscribed ? 'Pro Access' : 'Inactive', 
            icon: CreditCard,
            color: user?.isSubscribed ? 'text-green-500' : 'text-red-500'
        },
        { 
            title: 'Gemini API Key', 
            value: user?.geminiApiKey ? 'Configured' : 'Not Set', 
            icon: Key,
            color: user?.geminiApiKey ? 'text-primary' : 'text-gray-500'
        },
        { 
            title: 'Images Generated', 
            value: stats.images, 
            icon: ImageIcon,
            color: 'text-blue-500'
        },
        { 
            title: 'Daily Limit', 
            value: '0 / 50', 
            icon: Zap,
            color: 'text-yellow-500'
        },
    ];

    return (
        <div className="space-y-8 bg-white">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">Welcome back,</h1>
                <p className="text-gray-600">{user?.email}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2 sm:px-0">
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div
                            key={card.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-yellow p-6 rounded-2xl border border-primary/10 bg-white hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Icon size={24} className={card.color} />
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</span>
                            </div>
                            <h3 className="text-gray-500 text-xs font-medium mb-1">{card.title}</h3>
                            <p className="text-lg font-bold text-gray-900">{card.value}</p>
                        </motion.div>
                    );
                })}
            </div>

            <section className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Link href="/dashboard/generate" className="glass bg-white p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center group cursor-pointer hover:border-primary/50 transition-all hover:shadow-xl">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <ImageIcon className="text-primary" size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900">Create New Image</h3>
                        <p className="text-gray-600 text-sm">Select a style and bring your vision to life.</p>
                    </Link>
                    <Link href="/dashboard/api-key" className="glass bg-white p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col items-center text-center group cursor-pointer hover:border-primary/50 transition-all hover:shadow-xl">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Key className="text-primary" size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-900">Update API Key</h3>
                        <p className="text-gray-600 text-sm">Manage your Gemini AI credentials securely.</p>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default DashboardPage;
