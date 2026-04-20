"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const API_URL = 'http://localhost:5000/api';

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${API_URL}/auth/send-otp`, { email });
            toast.success('OTP sent to your email');
            setStep(2);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`${API_URL}/auth/verify-otp`, { email, otp });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            toast.success('Logged in successfully');
            router.push('/dashboard');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-2xl shadow-gray-200 relative overflow-hidden"
            >
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-black mb-3 text-gray-900">Welcome to <span className="text-primary">AIRAVAT</span></h2>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Secure OTP Login</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.form
                            key="email-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleSendOTP}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:border-primary transition-all font-bold text-gray-900 placeholder:text-gray-300"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-black font-black rounded-2xl glow-yellow hover:scale-[1.02] transition-all disabled:opacity-50 shadow-xl shadow-primary/20"
                            >
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-step"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            onSubmit={handleVerifyOTP}
                            className="space-y-6"
                        >
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Verification Code</label>
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-5 text-center text-3xl font-black tracking-[1rem] focus:outline-none focus:border-primary transition-all text-gray-900 placeholder:text-gray-200"
                                    placeholder="000000"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-black font-black rounded-2xl glow-yellow hover:scale-[1.02] transition-all disabled:opacity-50 shadow-xl shadow-primary/20"
                            >
                                {loading ? 'Verifying...' : 'Verify & Login'}
                            </button>
                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-xs font-black text-gray-400 hover:text-black uppercase tracking-widest transition-colors"
                            >
                                Change Email
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default LoginPage;
