import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Nav from '@/components/navigation/Nav';

import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn('mx-auto max-w-7xl px-6 md:px-12', inter.className)}>
                <Nav />
                {children}
            </body>
        </html>
    );
}
