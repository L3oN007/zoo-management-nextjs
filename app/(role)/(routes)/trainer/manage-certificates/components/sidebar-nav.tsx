'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';


type Route = {
	href: string;
	label: string;
	active: boolean;
};

export function SidebarNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
	const pathname = usePathname();
	let routes: Route[] = [];
	routes = [
	
		{
			href: `/trainer/manage-certificates`,
			label: 'Manage Certificate',
			active: pathname === `/trainer/manage-certificates`,
		},
		{
			href: `/trainer/view-certificates`,
			label: 'View Certificate',
			active: pathname === `/trainer/view-certificates`,
		},
		
	];

	return (

<nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
			{routes.map((route) => (
				<Link
					key={route.href}
					href={route.href}
					className={cn(
						buttonVariants({ variant: 'ghost' }),
						route.active ?
							 'bg-muted hover:bg-muted'
							: 'hover:bg-transparent hover:underline',
						'justify-start'
					)}
				>
					{route.label}
				</Link>
			))}
		</nav>

	);
}
