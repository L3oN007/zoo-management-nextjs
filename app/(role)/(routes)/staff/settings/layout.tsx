import { Metadata } from 'next';
import Image from 'next/image';

import { options } from '@/app/api/auth/[...nextauth]/options';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { getServerSession } from 'next-auth';
import { SidebarNav } from './components/sidebar-nav';

export const metadata: Metadata = {
	title: 'Settings',
	description: 'Advanced form example using react-hook-form and Zod.',
};

interface SettingsLayoutProps {
	children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
	const session = await getServerSession(options);
	const sidebarNavItems = [
		{
			title: 'Profile',
			href: `/${session?.user.role}/settings`,
		},
		{
			title: 'Password',
			href: `/${session?.user.role}/settings/password`,
		},
		{
			title: 'Logout',
			href: '/api/auth/signout',
		},
	];
	return (
		<>
			<div className='md:hidden'>
				<Image src='/examples/forms-light.png' width={1280} height={791} alt='Forms' className='block dark:hidden' />
				<Image src='/examples/forms-dark.png' width={1280} height={791} alt='Forms' className='hidden dark:block' />
			</div>
			<div className='hidden space-y-6 p-10 pb-16 md:block'>
				<Heading title='Settings' description='Manage your account settings and set e-mail preferences.' />
				<Separator className='my-6' />
				<div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
					<aside className='-mx-4 lg:w-1/5'>
						<SidebarNav items={sidebarNavItems} />
					</aside>
					<div className='flex-1 lg:max-w-full'>
						<Card className='p-6'>{children}</Card>
					</div>
				</div>
			</div>
		</>
	);
}
