"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Image as ImageIcon, 
    History, 
    Key, 
    CreditCard 
} from 'lucide-react';

const DashboardMobileNav = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Generator', icon: ImageIcon, href: '/dashboard/generate' },
    { name: 'Gallery', icon: History, href: '/dashboard/gallery' },
    { name: 'API Key', icon: Key, href: '/dashboard/api-key' },
    { name: 'Billing', icon: CreditCard, href: '/dashboard/billing' },
  ];

  return (
    <div className="md:hidden sticky top-[96px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 -mx-4 px-4 py-3 mb-6 overflow-x-auto no-scrollbar shadow-sm">
      <div className="flex space-x-2 w-max">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isActive 
                ? 'bg-primary text-black shadow-md shadow-primary/20' 
                : 'text-gray-500 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon size={14} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardMobileNav;
