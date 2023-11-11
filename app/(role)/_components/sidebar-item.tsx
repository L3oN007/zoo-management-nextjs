'use client';

import { ChevronDown, LucideIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  subItems?: {
    icon: any;
    label: string;
    href: string;
  }[];
}

export const SidebarItem = ({ icon: Icon, label, href, subItems }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [arrowRotation, setArrowRotation] = useState(0);

  const roles = ['/admin', '/staff', '/trainer'];
  let isActive = (pathname.includes(href) && !roles.includes(href)) || pathname === href;

  const onClick = () => {
    if (subItems && subItems.length > 0) {
      setArrowRotation(arrowRotation === 0 ? 180 : 0);
      setIsOpen(!isOpen);
    } else {
      router.push(href);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className={cn(
          'flex items-center gap-x-2 text-slate-500 text-sm  py-4 font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full',
          isActive &&
            'text-black font-semibold border-r-4 border-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-black w-full'
        )}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2 ">
            <Icon size={22} className={cn('text-slate-500', isActive && 'text-black')} />
            {label}
          </div>
          {subItems && subItems.length > 0 && (
            <div
              className={cn(
                'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all mr-2',
                isActive && isOpen && 'text-black font-semibold bg-slate-200/20 hover:bg-slate-200/20 hover:text-black'
              )}
            >
              <ChevronDown name="arrow-down" size={16} style={{ transform: `rotate(${arrowRotation}deg)` }} />{' '}
              {/* Add the arrow icon */}
            </div>
          )}
        </div>
        {/* <div className={cn(
          'ml-auto opacity-0 border-2 border-slate-700 h-full transition-all',
          isActive  && 'opacity-100'
        )}
     /> */}
      </button>
      {isOpen && subItems && subItems.length > 0 && (
        <ul className="pl-6 mt-2">
          {subItems.map((subItem) => (
            <li key={subItem.href}>
              <button
                onClick={() => router.push(subItem.href)}
                className="flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 w-full"
              >
                <div className="flex items-center gap-x-2 py-4">
                  <Icon size={22} className={cn('text-slate-500 text-sm', isActive && 'text-black font-semibold')} />
                  <span>{subItem.label}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function setArrowRotation(arg0: number) {
  throw new Error('Function not implemented.');
}
