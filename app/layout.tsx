import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { Inter, Space_Grotesk as SpaceGrotesk } from 'next/font/google';
import { Metadata } from 'next';

import './globals.css';
import '../styles/prism.css';
import { ThemeProvider } from '@/context/ThemeProvider';

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-inter',
});

const spaceGrotesk = SpaceGrotesk({
	subsets: ['latin'],
	weight: ['300', '400', '500', '600', '700'],
	variable: '--font-spaceGrotesk',
});

export const metadata: Metadata = {
	title: 'ChadOverflow',
	description: 'A platform for basement-dwellers to dunk on poor souls trying to learn the new trending JS framework.',
	icons: {
		icon: '/assets/images/site-logo.svg',
	},
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${inter.variable} ${spaceGrotesk.variable}`}>
				<ClerkProvider
					appearance={{
						elements: {
							formButtonPrimary: 'primary-gradient',
							footerActionLink: 'primary-text-gradient hover:text-primary-500',
						},
					}}
				>
					<ThemeProvider>{children}</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
