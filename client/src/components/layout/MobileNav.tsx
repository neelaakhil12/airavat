"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Info, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const MobileNav = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-[9998] bg-black/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 pb-safe-offset-2">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1 group relative"
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                isActive ? 'text-primary scale-110' : 'text-gray-400 group-hover:text-white'
              }`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive ? 'text-primary' : 'text-gray-400 group-hover:text-white'
              }`}>
                {item.name}
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="active-nav-dot"
                  className="absolute -top-1 w-1 h-1 bg-primary rounded-full shadow-[0_0_8px_#FFD700]"
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
