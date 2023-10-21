'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type Route = {
	href: string;
	label: string;
	active: boolean;
};

export function MainNav({ className, role, ...props }: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const params = useParams();
	let routes: Route[] = [];

	if (role === 'admin') {
		routes = [
			{
				href: `/admin`,
				label: 'Overview',
				active: pathname === `/admin`,
			},
			{
				href: `/admin/manage-staffs`,
				label: 'Manage Staffs',
				active: pathname === `/admin/manage-staffs`,
			},
			{
				href: `/${params.storeId}/billboards`,
				label: 'XXXXXX',
				active: pathname === `/${params.storeId}/billboards`,
			},
		];
	} else if (role === 'staff') {
		routes = [
			{
				href: `/staff`,
				label: 'Overview',
				active: pathname === `/staff`,
			},
			{
				href: `/staff/manage-news`,
				label: 'Manage News',
				active: pathname === `/staff/manage-news`,
			},
			{
				href: `/staff/manage-areas`,
				label: 'Manage Areas',
				active: pathname === `/staff/manage-areas`,
			},
			{
				href: `/staff/manage-cages`,
				label: 'Manage Cages',
				active: pathname === `/staff/manage-cages`,
			},
			{
				href: `/staff/manage-trainers`,
				label: 'Manage Trainers',
				active: pathname === `/staff/manage-trainers`,
			},
			{
				href: `/staff/manage-animals`,
				label: 'Manage Animals',
				active: pathname === `/staff/manage-animals`,
			},
			{
				href: `/staff/manage-certificates`,
				label: 'Manage Certificates',
				active: pathname === `/staff/manage-certificates`,
			},
			{
				href: `/staff/manage-foods`,
				label: 'Manage Foods',
				active: pathname === `/staff/manage-foods`,
			},
		];
	} else if(role === 'trainer'){
		routes = [
			{
				href: `/trainer/manage-animals`,
				label: 'Manage Animals',
				active: pathname === `/trainer/manage-animals`,
			},
			{
				href: `/trainer/manage-species`,
				label: 'Manage Species',
				active: pathname === `/trainer/manage-species`,
			},
			{
				href: `/trainer/manage-menus`,
				label: 'Manage Menus',
				active: pathname === `/trainer/manage-menus`,
			},
		]
	}

	return (
		<nav className={cn('flex items-center space-x-4 lg:space-x-6', className)} {...props}>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						'text-sm font-medium transition-colors hover:text-primary',
						route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
