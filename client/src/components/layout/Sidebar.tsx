"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
    LayoutDashboard, 
    Key, 
    CreditCard, 
    Image as ImageIcon, 
    History, 
    LogOut,
    Settings
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, href: '/dashboard' },
        { name: 'AI Generator', icon: ImageIcon, href: '/dashboard/generate' },
        { name: 'User Gallery', icon: History, href: '/dashboard/gallery' },
        { name: 'API Settings', icon: Key, href: '/dashboard/api-key' },
        { name: 'Subscription', icon: CreditCard, href: '/dashboard/billing' },
    ];

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 pt-32">
            <div className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                                isActive 
                                ? 'bg-primary/10 text-primary border border-primary/20' 
                                : 'text-gray-500 hover:text-black hover:bg-gray-50'
                            }`}
                        >
                            <Icon size={20} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-all"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
