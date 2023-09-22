import { redirect } from 'next/navigation';

import { MainNav } from '@/components/main-nav';
import { Avatar, AvatarImage } from './ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserNav } from './user-nav';
import Logo from './logo';

const Navbar = async () => {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<Logo />
				<MainNav className='mx-6' />
				<div className='ml-auto flex items-center space-x-4'>
					<ThemeToggle />
					<UserNav />
				</div>
			</div>
		</div>
	);
};

export default Navbar;
