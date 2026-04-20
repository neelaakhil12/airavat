"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, CheckCircle2, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

declare global {
    interface Window {
        Razorpay: any;
    }
}

const BillingPage = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) setUser(JSON.parse(storedUser));

        // Load Razorpay Script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleSubscribe = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            // 1. Create Order
            const { data: order } = await axios.post(
                `${API_URL}/payment/checkout`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 2. Open Razorpay Widget
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', 
                amount: order.amount,
                currency: "INR",
                name: "AIRAVAT Pro",
                description: "Pro Access Subscription (30 Days)",
                order_id: order.id,
                handler: async function (response: any) {
                    try {
                        const { data } = await axios.post(
                            `${API_URL}/payment/verify`,
                            response,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        if (data.status === 'success') {
                            toast.success('Subscription Activated!');
                            const updatedUser = { ...user, isSubscribed: true };
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                            setUser(updatedUser);
                        }
                    } catch (error) {
                        toast.error('Payment verification failed');
                    }
                },
                prefill: {
                    email: user?.email,
                },
                theme: {
                    color: "#FFD700",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error: any) {
            toast.error('Failed to initiate payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 bg-white text-gray-900">
            <header className="text-center">
                <h1 className="text-4xl font-bold mb-2">Subscription Plan</h1>
                <p className="text-gray-600 font-medium">Unlock the full power of AIRAVAT AI</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Why Go Pro?</h2>
                    <ul className="space-y-4">
                        {[
                            'Unlimited high-quality generations',
                            'Access to exclusive style categories',
                            'Priority 4K processing',
                            'Ad-free workspace',
                            'Early access to new models'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-start space-x-3 text-gray-700">
                                <CheckCircle2 className="text-primary mt-1 flex-shrink-0" size={18} />
                                <span className="font-medium">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center space-x-3">
                        <ShieldCheck className="text-primary" size={24} />
                        <p className="text-xs text-gray-500 font-bold">Secure payments via Razorpay. Cancel anytime.</p>
                    </div>
                </div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-yellow bg-white p-10 rounded-[2.5rem] border-2 border-primary/30 relative overflow-hidden flex flex-col text-center shadow-xl shadow-primary/5"
                >
                    {user?.isSubscribed && (
                        <div className="absolute top-6 right-6 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest">
                            Active
                        </div>
                    )}
                    <Zap className="text-primary mx-auto mb-6" size={48} />
                    <h3 className="text-2xl font-bold mb-2">Pro Access</h3>
                    <div className="flex items-center justify-center space-x-1 mb-8">
                        <span className="text-4xl font-bold text-gray-900">₹129</span>
                        <span className="text-gray-500 font-medium">/ 30 days</span>
                    </div>

                    <button
                        onClick={handleSubscribe}
                        disabled={loading || user?.isSubscribed}
                        className="w-full py-4 bg-primary text-black font-bold rounded-2xl glow-yellow transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <CreditCard size={20} />}
                        {user?.isSubscribed ? 'Subscription Active' : 'Subscribe Now'}
                    </button>
                    
                    <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest font-bold">Secure Checkout</p>
                </motion.div>
            </div>
        </div>
    );
};

export default BillingPage;
