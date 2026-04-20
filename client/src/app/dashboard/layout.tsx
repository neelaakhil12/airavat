import Sidebar from "@/components/layout/Sidebar";
import DashboardMobileNav from "@/components/layout/DashboardMobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-64 p-4 md:p-8 w-full">
        <DashboardMobileNav />
        {children}
      </div>
    </div>
  );
}
