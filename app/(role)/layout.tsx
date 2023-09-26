import Navbar from '@/components/navbar';

export default async function RoleLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
}
