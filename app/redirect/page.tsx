'use client';
import { Loader } from '@/components/ui/loader';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const RedirectPage = () => {
	return (
		<div className='flex h-full w-full items-center justify-center'>
			<Loader />
		</div>
	);
};

export default RedirectPage;
