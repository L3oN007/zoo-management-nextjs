'use client';
import { MenuIcon } from 'lucide-react';
import { Button } from './ui/button';
import { UserNav } from './user-nav';

interface NavbarProps {
  toggleSidebar: () => void;
  isSidebarVisible: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <Button onClick={toggleSidebar} className="p-2 h-10 w-10">
          <MenuIcon className="text-white" size={20} />
        </Button>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
