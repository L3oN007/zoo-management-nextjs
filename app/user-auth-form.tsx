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
import Image from 'next/image';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState('');
  const email = React.useRef('');
  const pass = React.useRef('');
  const router = useRouter();

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Assuming signIn is an async function
      const result = await signIn('credentials', {
        email: email.current,
        password: pass.current,
        redirect: false,
        callbackUrl: '/redirect'
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
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="username"
                  placeholder="Email"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => (email.current = e.target.value)}
                  required
                  className="block w-full "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  placeholder="Password"
                  type="password"
                  autoCapitalize="none"
                  autoComplete="password"
                  autoCorrect="off"
                  disabled={isLoading}
                  onChange={(e) => (pass.current = e.target.value)}
                  required
                  className="block w-full "
                />
              </div>

              {error && <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-4">{error}</div>}
            </div>

            <div>
              <Button
                disabled={isLoading}
                onClick={handleFormSubmit}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Log in
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
