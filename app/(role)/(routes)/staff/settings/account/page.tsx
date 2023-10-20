import { Separator } from '@/components/ui/separator';
import { AccountForm } from './account-form';
import { useSession } from 'next-auth/react';

export default function SettingsAccountPage() {
  var session = useSession();
  return (
    <div className="space-y-6 w-full">
      {/* <div>
				<h3 className='text-lg font-medium'>Account</h3>
				<p className='text-sm text-muted-foreground'>
					Update your account settings. Set your preferred language and timezone.
				</p>
			</div> */}
      {/* <Separator /> */}
      <AccountForm initialData={session.data} />
    </div>
  );
}
