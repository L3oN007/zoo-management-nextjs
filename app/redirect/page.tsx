import { Loader } from '@/components/ui/loader';
import { Loader2 } from 'lucide-react';

const RedirectPage = () => {
	return (
		<div className='flex justify-center'>
			<Loader2 className='animate-spin h-12 w-12' />
		</div>
	);
};

export default RedirectPage;
