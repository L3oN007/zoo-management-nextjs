'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
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
			href: `/admin`,
			label: 'Admin',
			active: pathname === `/admin`,
		},
		{
			href: `/staff`,
			label: 'Staff',
			active: pathname === `/staff`,
		},
		{
			href: `/trainer`,
			label: 'Trainer',
			active: pathname === `/trainer`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: 'XXXXXX',
			active: pathname === `/${params.storeId}/billboards`,
		},
	];

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
