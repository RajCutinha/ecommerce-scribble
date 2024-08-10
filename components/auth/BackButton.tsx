'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface BackButtonProps {
    href: string;
    label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
    return (
        <Button className="w-full font-medium" asChild variant={'link'}>
            <Link aria-label={label} href={href}>
                {label}
            </Link>
        </Button>
    );
}
