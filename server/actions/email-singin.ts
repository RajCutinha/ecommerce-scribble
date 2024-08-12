"use server";

import { createSafeActionClient } from "next-safe-action";


import { eq } from "drizzle-orm";

import db from "../index";
import { users } from "../schema";

import { loginSchema } from "@/types/login-schema";

const action = createSafeActionClient();

export const emailSignIn = action(loginSchema, async ({ email, password, code }) => {
    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email)
    })

    if(existingUser?.email !== email) {
        return { error: "Email not found" };
    }

    // if(!existingUser?.emailVerified) {

    // }

    return { success: email };
});