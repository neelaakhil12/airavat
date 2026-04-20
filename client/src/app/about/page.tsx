"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    Shield, Zap, Heart, Globe, 
    ArrowRight, Lock, Sparkles, 
    Smartphone, Download, Cpu 
} from 'lucide-react';

const AboutPage = () => {
    const values = [
        { icon: Zap, title: "Innovation", desc: "Pushing the boundaries of what AI can create." },
        { icon: Shield, title: "Simplicity", desc: "Complex AI tools made incredibly easy for everyone." },
        { icon: Heart, title: "Creativity", desc: "Empowering users to bring their wildest visions to life." },
        { icon: Globe, title: "User Control", desc: "Your API keys, your vision, your generated art." }
    ];

    const steps = [
        { 
            title: "Secure Authentication", 
            desc: "Sign up and configure your Gemini API key in seconds with AES-256 encryption.",
            icon: Lock
        },
        { 
            title: "Creative Prompting", 
            desc: "Use our tailored categories or custom prompts to define your artistic vision.",
            icon: MessageSquare
        },
        { 
            title: "High-Res Generation", 
            desc: "Our engine processes your request through Google's Gemini Pro Vision model.",
            icon: Sparkles
        },
        { 
            title: "Instant Download", 
            desc: "Save your AI-generated masterpiece directly to your device or cloud gallery.",
            icon: Download
        }
    ];

    return (
        <div className="pt-20 pb-32 bg-white min-h-screen">
            {/* Mission Section */}
            <section className="max-w-7xl mx-auto px-4 text-center mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900 leading-tight">
                        The Vision Behind <span className="text-primary">AIRAVAT</span>
                    </h1>
                    <p className="max-w-3xl mx-auto text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
                        AIRAVAT is designed to bridge the gap between complex AI generative models and your creative imagination. 
                        Our mission is to provide a premium, accessible platform where users can harness the power of Gemini AI 
                        to create professional-grade art without needing to worry about complex prompt engineering.
                    </p>
                </motion.div>
            </section>

            {/* Core Values */}
            <section className="max-w-7xl mx-auto px-4 mb-40">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((v, i) => {
                        const Icon = v.icon;
                        return (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 text-center group hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-gray-100"
                            >
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                                    <Icon size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-gray-900">{v.title}</h3>
                                <p className="text-gray-600 text-sm font-medium leading-relaxed">{v.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* The Process Section */}
            <section className="bg-gray-50/50 py-32 border-y border-gray-100 mb-40">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">The AIRAVAT Journey</h2>
                        <p className="text-gray-500 font-medium max-w-2xl mx-auto">From setup to masterpiece, we’ve perfected every second of the creative flow.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            return (
                                <motion.div 
                                    key={step.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative"
                                >
                                    <div className="w-14 h-14 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 relative z-10">
                                        <Icon size={24} />
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">{step.desc}</p>
                                    {i < steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-7 left-20 w-full h-[2px] bg-gray-100 -z-0" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Engineering & Security Section */}
            <section className="max-w-7xl mx-auto px-4 mb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                         initial={{ opacity: 0, x: -30 }}
                         animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                            Engineered for <span className="text-primary">Technical Excellence</span>
                        </h2>
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 flex-shrink-0">
                                    <Cpu size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Google Gemini AI Engine</h4>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        We utilize the latest Gemini Pro Vision API to ensure state-of-the-art image quality, 
                                        spatial reasoning, and artistic interpretation that surpasses standard diffusion models.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900 flex-shrink-0">
                                    <Lock size={24} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-bold text-gray-900 mb-2">Military-Grade Encryption</h4>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        Your private API keys are never stored in plain text. Every key is protected 
                                        using AES-256 Bit encryption, with multi-layered secure hashing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />
                        <h3 className="text-2xl font-bold mb-6">Our Platform Statistics</h3>
                        <div className="grid grid-cols-2 gap-8 relative z-10">
                            <div>
                                <p className="text-4xl font-bold text-primary mb-1">99.9%</p>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Uptime Reliability</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary mb-1">256-Bit</p>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Security Standard</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary mb-1">0.5s</p>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Prompt Processing</p>
                            </div>
                            <div>
                                <p className="text-4xl font-bold text-primary mb-1">100%</p>
                                <p className="text-xs uppercase font-bold tracking-widest text-gray-400">Private Ownership</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="max-w-5xl mx-auto px-4 text-center">
                <div className="bg-primary p-12 md:p-20 rounded-[4rem] text-black shadow-2xl shadow-primary/20">
                    <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to define the future of your art?</h2>
                    <p className="text-lg font-bold mb-10 opacity-80 max-w-2xl mx-auto">Join thousands of creators using AIRAVAT to bring their imaginations into the 4k reality.</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/login" className="px-10 py-5 bg-black text-white font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-2">
                            Access Dashboard <ArrowRight size={20} />
                        </Link>
                        <Link href="/contact" className="px-10 py-5 bg-white text-black font-black rounded-2xl border-2 border-black/5 hover:bg-gray-50 transition-all">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

const MessageSquare = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 1 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

export default AboutPage;
