'use client';

import Link from 'next/link';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useAction } from 'next-safe-action/hooks';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import AuthCard from '@/components/auth/AuthCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';

import FormSuccess from './FormSuccess';
import FormError from './FormError';

import { emailRegister } from '@/server/actions/email-register';

import { registerSchema } from '@/types/register-schema';
import { cn } from '@/lib/utils';

export default function RegisterForm() {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const { execute, status } = useAction(emailRegister, {
        onSuccess: (data) => {
            if(data.error) setError(data.error);
            if(data.success) setSuccess(data.success);
        }
    });

    const onsubmit = async (data: z.infer<typeof registerSchema>) => {
        execute(data);
    };

    return (
        <AuthCard
            cardTitle="Create an account 🎉"
            backButtonHref="/auth/login"
            backButtonLabel="Already have an account?"
            showSocials
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username:</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="username" type="text" />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="youremail@example.com"
                                                type="email"
                                                autoComplete="email"
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password:</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="••••••••••••"
                                                type="password"
                                                autoComplete="current-password"
                                            />
                                        </FormControl>
                                        <FormDescription />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormSuccess message={success} />
                            <FormError message={error} />
                            <Button size={'sm'} variant={'link'} asChild>
                                <Link href="/auth/reset">Forgot your password?</Link>
                            </Button>
                        </div>
                        <Button
                            size={'sm'}
                            type="submit"
                            className={cn('my-2 w-full', status === 'executing' ? 'animate-pulse' : '')}
                        >
                            Register
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    );
}
