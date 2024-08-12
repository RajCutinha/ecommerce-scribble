'use client';

import { useState, useCallback, useEffect } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import AuthCard from '@/components/auth/AuthCard';

import FormSuccess from './FormSuccess';
import FormError from './FormError';

import { newVerification } from '@/server/actions/tokens';

export default function EmailVerificationForm() {
    const token = useSearchParams().get('token');
    const router = useRouter();

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleVerification = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError('Token not found');
            return;
        }

        newVerification(token).then((data) => {
            if (data.error) {
                setError(data.error);
            }
            if (data.success) {
                setSuccess(data.success);
                router.push('/auth/login');
            }
        });
    }, []);

    useEffect(() => {
        handleVerification();
    }, []);

    return (
        <AuthCard cardTitle="Verify your Account" backButtonLabel="Back to login" backButtonHref="/auth/login">
            <div className='flex items-center flex-col w-full justify-center'>
                <p>{!success && !error ? 'Verifying email...' : null}</p>
                <FormSuccess message={success} />
                <FormError message={error} />
            </div>
        </AuthCard>
    );
}
