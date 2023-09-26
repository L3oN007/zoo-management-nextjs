'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CaretDownIcon, GearIcon, PersonIcon, PinRightIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';


export function UserNav({ userRole }: { userRole: string | undefined }) {
	const router = useRouter();


	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className='flex cursor-pointer'>
					<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
						<Avatar className='h-8 w-8'>
							<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
							<AvatarFallback>N</AvatarFallback>
						</Avatar>
					</Button>
					<div className='flex-1 flex-col space-y-1 ml-2'>
						<p className='text-sm font-medium leading-none'>Minh Nhat</p>
						<p className='text-xs leading-none text-muted-foreground mt-1'>Role : {userRole?.charAt(0).toUpperCase() + userRole!.slice(1)} </p>
					</div>
					<div className='flex-2 flex-col space-y-1 ml-1 mt-2'>
						<CaretDownIcon className='text-xl' />
					</div>
				</div>

			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex'>
						<Avatar className='h-8 w-8 mr-2'>
							<AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
							<AvatarFallback>N</AvatarFallback>
						</Avatar>
						<div className='flex flex-col space-y-1'>
							<p className='text-sm font-medium leading-none'>Minh Nhat</p>
							<p className='text-xs leading-none text-muted-foreground mt-1'>minhnhatt123@gmail.com </p>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem onClick={() => router.push('/admin/settings')}>
						<PersonIcon className='mr-2' /> Profile
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => router.push('/settings')}>
						<GearIcon className='mr-2' /> Settings
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => router.push('/api/auth/signout')} className='text-red-500'>
					,<PinRightIcon className='mr-2' /> Log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
