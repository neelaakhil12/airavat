"use client";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Key, Eye, EyeOff, Save, Loader2, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ApiKeyPage = () => {
    const [apiKey, setApiKey] = useState('');
    const [showKey, setShowKey] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasKey, setHasKey] = useState(false);

    const API_URL = 'http://localhost:5000/api';

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.geminiApiKey) setHasKey(true);
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!apiKey) return toast.error('Please enter an API Key');

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `${API_URL}/user/save-api-key`,
                { apiKey },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('API Key validated and saved securely!');
            setHasKey(true);
            setApiKey('');
            
            // Update local storage user object
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            user.geminiApiKey = 'configured'; // Just a flag
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to validate API Key');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 bg-white pb-20">
            <header>
                <h1 className="text-3xl font-bold text-gray-900">API Key Management</h1>
                <p className="text-gray-600">Securely store your Gemini AI API key to enable image generation</p>
            </header>

            <div className="glass-yellow bg-white p-8 rounded-3xl border border-primary/20 shadow-xl shadow-primary/5">
                <div className="flex items-center space-x-4 mb-8">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 text-lg">AES-256 Encryption</h3>
                        <p className="text-xs text-gray-500 font-bold">Your key is encrypted on our servers and only decrypted during generation.</p>
                    </div>
                </div>

                {hasKey && (
                    <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-4 mb-8 flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-widest">Your Gemini API Key is configured.</span>
                    </div>
                )}

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="relative">
                        <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Gemini API Key</label>
                        <div className="relative">
                            <input
                                type={showKey ? 'text' : 'password'}
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder={hasKey ? 'Enter new key to update...' : 'Enter your key from Google AI Studio'}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 pr-12 focus:outline-none focus:border-primary transition-all font-mono"
                            />
                            <button
                                type="button"
                                onClick={() => setShowKey(!showKey)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                            >
                                {showKey ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-100 rounded-xl p-4 text-xs text-gray-600 space-y-2 font-medium">
                        <p>1. Go to <a href="https://aistudio.google.com/" target="_blank" className="text-primary font-bold hover:underline">Google AI Studio</a></p>
                        <p>2. Generate a new API Key</p>
                        <p>3. Paste it here to enable high-quality image generation</p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-black font-bold rounded-xl flex items-center justify-center gap-2 glow-yellow disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {loading ? 'Validating Key...' : 'Save & Secure API Key'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApiKeyPage;
