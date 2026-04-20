"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/admin');

    return (
        <footer className={`bg-logo-bg border-t border-white/5 pt-12 pb-32 md:pb-12 px-4 transition-all duration-300 ${isDashboard ? 'md:ml-64 ml-0' : 'mt-20'}`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center mb-6">
                            <img src="/logo.png" alt="AIRAVAT Logo" className="h-16 w-auto" />
                        </Link>
                        <p className="text-gray-400 max-w-sm text-sm font-medium leading-relaxed">
                            AIRAVAT is an AI-powered platform designed for high-quality personalized image generation. 
                            Express your vision and bring it to life with the power of Gemini AI.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Platform</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-primary transition-colors font-semibold">Home</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors font-semibold">About Mission</Link></li>
                            <li><Link href="/dashboard" className="hover:text-primary transition-colors font-semibold">Dashboard</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors font-semibold">Contact Support</Link></li>
                            <li><Link href="/login" className="hover:text-primary transition-colors font-semibold">Get Started</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Connect</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors font-semibold">Twitter (X)</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors font-semibold">Instagram</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors font-semibold">Discord Community</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs text-center md:text-left font-medium">
                        © {new Date().getFullYear()} AIRAVAT AI. All rights reserved. 
                        <span className="mx-2">•</span> 
                        Privacy Policy
                    </p>
                    <p className="text-white text-[10px] font-bold uppercase tracking-widest">
                        Powered by <span className="text-primary">Gemini AI</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
