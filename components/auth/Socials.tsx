'use client';

import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

export default function Socials() {
    return (
        <div className="flex w-full flex-col items-center gap-4">
            <Button
                className="flex w-full gap-4"
                variant={'outline'}
                onClick={() =>
                    signIn('google', {
                        callbackUrl: '/',
                        redirect: false
                    })
                }
            >
                <p>Sign in with Google</p>
                <FcGoogle className="h-5 w-5" />
            </Button>
            <Button
                className="flex w-full gap-4"
                variant={'outline'}
                onClick={() =>
                    signIn('github', {
                        callbackUrl: '/',
                        redirect: false
                    })
                }
            >
                <p>Sign in with Github</p>
                <FaGithub />
            </Button>
        </div>
    );
}
