'use client';

import { Session } from 'next-auth';

import { signOut } from 'next-auth/react';

export default function UserButton({ user }: Session) {
    return (
        <>
            <h1 className="text-white">{user?.name}</h1>
            <button onClick={() => signOut()}>Sign Out</button>
        </>
    );
}
