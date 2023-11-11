'use client';
import Navbar from '@/components/navbar';
import { Sidebar } from './_components/sidebar';
import { useState } from 'react';

export default function RoleLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  return (
    <div className="h-full flex">
      <div className={`h-full min-w-[10%] w-57 flex-col inset-y-0 z-50 ${isSidebarVisible ? 'hidden' : ''}`}>
        <Sidebar />
      </div>
      <div className="flex-1  ">
        <Navbar toggleSidebar={toggleSidebar} isSidebarVisible={isSidebarVisible} />
        <main>{children}</main>
      </div>
    </div>
  );
}
