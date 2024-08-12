'use server';

import { Resend } from 'resend';

import getBaseURL from '@/lib/baseURL';

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = getBaseURL();

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-varification?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verify your email',
        html: `<h1>Verify your email</h1><p>Click the button to verify your email</p><a href="${confirmLink}">Confirm</a>`
    });

    if (error) {
        return error;
    }

    if (data) {
        return data;
    }
};
