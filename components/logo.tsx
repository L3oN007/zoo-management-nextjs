'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
	const router = useRouter();
	const { theme } = useTheme();

	// Define the image sources for both dark and light themes
	const darkThemeImageSrc = '/images/logo-dark.svg';
	const lightThemeImageSrc = '/images/logo-light.svg';

	// Determine which image source to use based on the theme
	const imageSrc = theme === 'dark' ? darkThemeImageSrc : lightThemeImageSrc;

	return (
		<Image
			onClick={() => router.push('/')}
			className='hidden md:block cursor-pointer'
			src={imageSrc}
			height='150'
			width='130'
			alt='Logo'
		/>
	);
};

export default Logo;
