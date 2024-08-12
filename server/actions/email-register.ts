'use server';

import { createSafeActionClient } from 'next-safe-action';

import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';

import db from '../index';
import { users } from '../schema';

import { registerSchema } from '@/types/register-schema';
import { generateEmailVerificationToken } from './tokens';
import { sendVerificationEmail } from './email';

const action = createSafeActionClient();

export const emailRegister = action(registerSchema, async ({ name, email, password, code }) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    });

    if (existingUser) {
        if (!existingUser.emailVerified) {
            const verificationToken = await generateEmailVerificationToken(email);
            await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);

            return { success: 'Email Confimation Sent' };
        }
        return { error: 'User already exists' };
    }

    await db.insert(users).values({
        name,
        email,
        password: hashedPassword
    });

    const verificationToken = await generateEmailVerificationToken(email);

    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token);

    return { success: 'Confimation Email Sent' };
});
