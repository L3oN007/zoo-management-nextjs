import { PasswordForm } from './password-form';

export default function SettingsAccountPage() {
	return (
		<div className='space-y-6 w-full'>
			<PasswordForm initialData={null} />
		</div>
	);
}
