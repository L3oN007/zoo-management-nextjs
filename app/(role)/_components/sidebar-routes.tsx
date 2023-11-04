'use client';

import {
  Apple,
  ArchiveRestore,
  BadgeCheck,
  CalendarCheckIcon,
  Cat,
  Compass,
  Layout,
  LucideIcon,
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
  icon: LucideIcon;
  label: string;
  href: string;
    subItems?: {
      icon: LucideIcon;
      label: string;
      href: string;
    }[];
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
        href: '/staff/manage-trainers',
        subItems: [
          {
            icon: User,
            label: 'Lead Trainer',
            href: '/staff/manage-trainers/lead'
          },
          {
            icon: User,
            label: 'Normal Trainer',
            href: '/staff/manage-trainers/normal'
          },
          // Add more trainer subitems as needed
        ]
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
        href: '/staff/manage-certificates',
        subItems: [
          {
            icon: BadgeCheck,
            label: 'Edit All Certificate',
            href: '/staff/manage-certificates/view'
          },
          {
            icon: BadgeCheck,
            label: 'Employee Certificate',
            href: '/staff/manage-certificates/empCertificate'
          },
          // Add more trainer subitems as needed
        ]

      },
      {
        icon: ArchiveRestore,
        label: 'Manage Foods',
        href: '/staff/manage-foods',
        subItems: [
          {
            icon: ArchiveRestore,
            label: 'Import History',
            href: '/staff/manage-foods/importHistory'
          },
          {
            icon: Apple,
            label: 'Food In Zoo',
            href: '/staff/manage-foods/food'
          },
          // Add more trainer subitems as needed
        ]
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
        <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} subItems={route.subItems}/>
      ))}
    </div>
  );
};
