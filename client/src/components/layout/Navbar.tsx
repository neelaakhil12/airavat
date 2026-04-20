"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-logo-bg border-b border-white/5 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24 md:h-32 px-4 md:px-8">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <img src="/logo.png" alt="AIRAVAT Logo" className="h-16 md:h-24 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`relative px-3 py-2 text-sm font-bold transition-colors ${
                                        pathname === link.href ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                    {pathname === link.href && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        <Link
                            href="/login"
                            className="px-4 md:px-6 py-2 rounded-full text-[10px] md:text-sm font-bold bg-primary text-black hover:bg-accent transition-all glow-yellow shadow-xl whitespace-nowrap"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
