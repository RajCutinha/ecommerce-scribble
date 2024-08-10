import Link from 'next/link';

import { auth } from '@/server/auth';

import { LogIn } from 'lucide-react';

import Logo from './Logo';
import UserButton from './UserButton';

import { Button } from '@/components/ui/button';

export default async function Nav() {
    const session = await auth();

    return (
        <header className="py-8">
            <nav>
                <ul className="flex items-center justify-between">
                    <li>
                        <Link href="/">
                            <Logo />
                        </Link>
                    </li>
                    {!session ? (
                        <li>
                            <Button asChild>
                                <Link href="/auth/login" className="flex items-center gap-2">
                                    <LogIn size={16} />
                                    <span>Sign in</span>
                                </Link>
                            </Button>
                        </li>
                    ) : (
                        <li>
                            <UserButton expires={session?.expires} user={session?.user} />
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
