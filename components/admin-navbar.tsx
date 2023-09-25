import { MainNav } from '@/components/main-nav';
import { Avatar, AvatarImage } from './ui/avatar';
import { ThemeToggle } from '@/components/theme-toggle';
import { UserNav } from './user-nav';
import Logo from './logo';
import { getServerSession } from 'next-auth';
import { options } from '@/app/api/auth/[...nextauth]/options';

const AdminNavbar = async () => {
    const session = await getServerSession(options);
    return (
        <div className='border-b'>
            <div className='flex h-16 items-center px-4'>
                <Logo />
                <MainNav className='mx-6' />
                <div className='ml-auto flex items-center space-x-4'>
                    <ThemeToggle />
                    <UserNav userRole={session?.user?.role} />
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
