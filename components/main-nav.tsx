'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { type } from 'os';

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
				href: `/api/auth/signin`,
				label: 'Login',
				active: pathname === `/api/auth/signin`,
			},
			{
				href: `/api/auth/signout`,
				label: 'Logout',
				active: pathname === `/api/auth/signout`,
			},
			{
				href: `/admin/manage-staff`,
				label: 'Manage Staffs',
				active: pathname === `/admin/manage-staff`,
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
				href: `/api/auth/signin`,
				label: 'Login',
				active: pathname === `/api/auth/signin`,
			},
			{
				href: `/api/auth/signout`,
				label: 'Logout',
				active: pathname === `/api/auth/signout`,
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
				href: `/staff/manage-cage`,
				label: 'Manage Cage',
				active: pathname === `/staff/manage-cage`,
			},
			{
				href: `/staff/manage-trainers-account`,
				label: 'Manage Trainer Account',
				active: pathname === `/staff/manage-trainers-account`,
			},
			{
				href: `/${params.storeId}/billboards`,
				label: 'XXXXXX',
				active: pathname === `/${params.storeId}/billboards`,
			},
		];
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
					)}>
					{route.label}
				</Link>
			))}
		</nav>
	);
}
