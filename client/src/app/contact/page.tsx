"use client";
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Globe, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const ContactPage = () => {
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setTimeout(() => {
            setStatus('sent');
            toast.success("Message sent! We'll get back to you soon.");
        }, 1500);
    };

    return (
        <div className="pt-10 md:pt-20 pb-40 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header Section */}
                <header className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                            Get in <span className="text-primary">Touch</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-600 text-lg font-medium">
                            Have questions about AIRAVAT or need support with your AI generations? 
                            Our team is here to help you bring your vision to life.
                        </p>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gray-50/50 p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Full Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:border-primary transition-all font-medium"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        placeholder="john@example.com"
                                        className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:border-primary transition-all font-medium"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Subject</label>
                                <input 
                                    type="text" 
                                    required
                                    placeholder="How can we help?"
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:border-primary transition-all font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Message</label>
                                <textarea 
                                    required
                                    rows={5}
                                    placeholder="Tell us more about your inquiry..."
                                    className="w-full bg-white border border-gray-200 rounded-2xl px-4 py-4 focus:outline-none focus:border-primary transition-all font-medium resize-none"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status !== 'idle'}
                                className="w-full py-5 bg-primary text-black font-black rounded-2xl flex items-center justify-center gap-3 glow-yellow hover:scale-[1.02] transition-all disabled:opacity-50"
                            >
                                {status === 'sending' ? (
                                    'Sending...'
                                ) : status === 'sent' ? (
                                    'Message Sent!'
                                ) : (
                                    <>
                                        <Send size={20} />
                                        Send Message
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-12 lg:pt-12"
                    >
                        <div className="space-y-8">
                            <div className="flex items-start space-x-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                                    <Mail size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
                                    <p className="text-gray-600 font-medium mb-1">Our team typically responds within 24 hours.</p>
                                    <a href="mailto:support@airavat.ai" className="text-primary font-bold hover:underline">support@airavat.ai</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                                    <MessageSquare size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Community Discord</h3>
                                    <p className="text-gray-600 font-medium mb-1">Get instant help and share your art with others.</p>
                                    <a href="#" className="text-primary font-bold hover:underline">Join AIRAVAT Discord</a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-6">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
                                    <Globe size={28} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Global Presence</h3>
                                    <p className="text-gray-600 font-medium">Headquartered in the cloud, serving creators worldwide.</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-gray-100">
                            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Follow Our Journey</h4>
                            <div className="flex space-x-4">
                                {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                                    <a 
                                        key={social} 
                                        href="#" 
                                        className="px-6 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-bold text-gray-700 hover:bg-primary/10 hover:text-primary hover:border-primary/20 transition-all"
                                    >
                                        {social}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
