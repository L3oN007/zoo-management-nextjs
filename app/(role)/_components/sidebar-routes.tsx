'use client';

import {
  ArchiveRestore,
  BadgeCheck,
  CalendarCheckIcon,
  Cat,
  Compass,
  Layout,
  MapPin,
  MenuSquareIcon,
  Newspaper,
  PawPrint,
  Ticket,
  User,
  User2
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { SidebarItem } from './sidebar-item';

type Route = {
  icon: any;
  label: string;
  href: string;
};

export const SidebarRoutes = () => {
  const session = useSession();
  const role = session.data?.user.role;
  let routes: Route[] = [];
  if (role === 'admin') {
    routes = [
      {
        icon: Compass,
        label: 'Overview',
        href: '/admin'
      },
      {
        icon: User,
        label: 'Manage Staffs',
        href: '/admin/manage-staffs'
      },
      {
        icon: Ticket,
        label: 'Manage Tickets',
        href: '/admin/manage-tickets'
      }
    ];
  } else if (role === 'staff') {
    routes = [
      {
        icon: Compass,
        label: 'Overview',
        href: '/staff'
      },
      {
        icon: Newspaper,
        label: 'Manage News',
        href: '/staff/manage-news'
      },
      {
        icon: User,
        label: 'Manage Trainers',
        href: '/staff/manage-trainers'
      },
      {
        icon: MapPin,
        label: 'Manage Areas',
        href: '/staff/manage-areas'
      },
      {
        icon: Layout,
        label: 'Manage Cages',
        href: '/staff/manage-cages'
      },
      {
        icon: Cat,
        label: 'Manage Animals',
        href: '/staff/manage-animals'
      },
      {
        icon: BadgeCheck,
        label: 'Manage Certificates',
        href: '/staff/manage-certificates'
      },
      {
        icon: ArchiveRestore,
        label: 'Manage Foods',
        href: '/staff/manage-foods'
      }
    ];
  } else if (role === 'trainer') {
    routes = [
      {
        icon: Compass,
        label: 'Overview',
        href: '/trainer'
      },
      {
        icon: CalendarCheckIcon,
        label: 'Feeding Schedule',
        href: '/trainer/feeding-schedule'
      },
      {
        icon: Cat,
        label: 'Manage Animals',
        href: '/trainer/manage-animals'
      },
      {
        icon: PawPrint,
        label: 'Manage Species',
        href: '/trainer/manage-species'
      },
      {
        icon: MenuSquareIcon,
        label: 'Manage Menus',
        href: '/trainer/manage-menus'
      }
    ];
  }

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
      ))}
    </div>
  );
};