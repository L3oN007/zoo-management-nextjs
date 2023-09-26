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
				href: `/admin/overview`,
				label: 'Overview',
				active: pathname === `/admin/overview`,
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
