import Link from 'next/link';
import { LayoutGrid, Users, Image as ImageIcon, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white min-h-screen">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-50 border-r border-gray-100 flex flex-col h-screen fixed left-0 top-0 pt-20">
        <div className="px-6 py-4">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Admin Panel</span>
        </div>
        <div className="flex-1 px-4 py-2 space-y-2">
            <Link href="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
                <LayoutGrid size={20} />
                <span>Dashboard</span>
            </Link>
            <Link href="/admin/users" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
                <Users size={20} />
                <span>Manage Users</span>
            </Link>
            <Link href="/admin/prompts" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-100 hover:text-black transition-all">
                <ImageIcon size={20} />
                <span>Prompts & Categories</span>
            </Link>
        </div>
        <div className="p-4 border-t border-gray-100">
            <Link href="/dashboard" className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition-all">
                <LogOut size={20} />
                <span>Exit Admin</span>
            </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
