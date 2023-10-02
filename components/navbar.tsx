import { options } from '@/app/api/auth/[...nextauth]/options';
import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { getServerSession } from 'next-auth';
import Logo from './logo';
import { UserNav } from './user-nav';

const Navbar = async () => {
	const session = await getServerSession(options);
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<Logo />
				<MainNav className='mx-6' role={session?.user?.role} />
				<div className='ml-auto flex items-center space-x-4'>
					<ThemeToggle />
					<UserNav userRole={session?.user?.role} />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
