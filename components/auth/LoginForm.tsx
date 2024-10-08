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

import { emailSignIn } from '@/server/actions/email-singin';

import { loginSchema } from '@/types/login-schema';
import { cn } from '@/lib/utils';

export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const { execute, status } = useAction(emailSignIn, {
        onSuccess: (data) => {
            console.log(data);
        },
    });

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const onsubmit = async (data: z.infer<typeof loginSchema>) => {
        execute(data);
    };

    return (
        <AuthCard
            cardTitle="Welcome back!"
            backButtonHref="/auth/register"
            backButtonLabel="Create a new account"
            showSocials
        >
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onsubmit)}>
                        <div>
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
                            <Button size={'sm'} variant={'link'} asChild>
                                <Link href="/auth/reset">Forgot your password?</Link>
                            </Button>
                        </div>
                        <Button
                            size={'sm'}
                            type="submit"
                            className={cn('my-2 w-full', status === 'executing' ? 'animate-pulse' : '')}
                        >
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    );
}
