import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { options } from '../api/auth/[...nextauth]/options';

export default async function DRedirectLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);
  const userRole = session?.user?.role;

  if (!session) {
    redirect('/');
  }

  if (userRole === 'admin') {
    redirect('/admin');
  }
  if (userRole === 'staff') {
    redirect('/staff');
  }
  if (userRole === 'trainer') {
    redirect('/trainer');
  }
  return <>{children}</>;
}
