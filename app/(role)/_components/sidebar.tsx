import React from 'react';
import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';

export const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm ">
      <div className="py-4 px-10 ">
        <Logo />
      </div>
      <div className="flex flex-col w-full h-full">
        <SidebarRoutes />
      </div>
    </div>
  );
};
