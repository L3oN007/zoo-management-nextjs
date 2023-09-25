import AuthProvider from '@/context/AuthProvider';
import { ThemeProvider } from '@/providers/theme-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/providers/toast-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Zoo Management System',
	description: 'Zoo Management System',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<AuthProvider>
					<ThemeProvider attribute='class' defaultTheme='system' enableSystem>
						<ToastProvider />
						{children}
					</ThemeProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
