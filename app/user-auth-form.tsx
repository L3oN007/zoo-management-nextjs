'use client';

import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState('');
	const userName = React.useRef('');
	const pass = React.useRef('');
	const router = useRouter();

	const handleFormSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		setIsLoading(true);

		try {
			// Assuming signIn is an async function
			const result = await signIn('credentials', {
				username: userName.current,
				password: pass.current,
				redirect: false,
				callbackUrl: '/redirect',
			});

			if (result?.error) {
				setError('Username or password is not correct.');
			} else {
				// If the signIn was successful, navigate to '/redirect'
				router.push('/redirect');
			}
		} catch (error) {
			console.error('Authentication error:', error);
			// Handle error state or display an error message to the user
			setError('Authentication failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<form onSubmit={handleFormSubmit}>
				<div className='grid gap-2'>
					<div className='grid gap-1'>
						<Label className='sr-only' htmlFor='username'>
							Username
						</Label>
						<Input
							id='username'
							placeholder='Username'
							type='text'
							autoCapitalize='none'
							autoComplete='email'
							autoCorrect='off'
							disabled={isLoading}
							onChange={(e) => (userName.current = e.target.value)}
						/>
						<Label className='sr-only' htmlFor='password'>
							Email
						</Label>
						<Input
							id='password'
							placeholder='Password'
							type='password'
							autoCapitalize='none'
							autoComplete='password'
							autoCorrect='off'
							disabled={isLoading}
							onChange={(e) => (pass.current = e.target.value)}
						/>
					</div>
					{error && (
						<div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
							{error}
						</div>
					)}
					<Button disabled={isLoading} onClick={handleFormSubmit}>
						{isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
						Log in
					</Button>
				</div>
			</form>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>Or continue with</span>
				</div>
			</div>
			<Button variant='outline' type='button' disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
				) : (
					<Icons.gitHub className='mr-2 h-4 w-4' />
				)}{' '}
				Github
			</Button>
		</div>
	);
}
