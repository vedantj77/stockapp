'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        // Step 1: Create user with better-auth
        const response = await auth.api.signUpEmail({ 
            body: { 
                email, 
                password, 
                name: fullName 
            } 
        });

        console.log('🔵 [AUTH] User created response:', response);

        // Step 2: Send to Inngest for additional processing
        // Use try-catch here so Inngest errors don't break the signup
        try {
            await inngest.send({
                name: 'app/user.created',
                data: { 
                    email, 
                    name: fullName, 
                    country, 
                    investmentGoals, 
                    riskTolerance, 
                    preferredIndustry 
                }
            });
            console.log('✅ [AUTH] Inngest event sent successfully');
        } catch (inngestError) {
            console.log('⚠️ [AUTH] Inngest error (user was still created):', inngestError);
            // Don't throw - user was created successfully
        }

        // Step 3: Return success
        return { 
            success: true, 
            data: response,
            message: 'Account created successfully'
        };
        
    } catch (error: any) {
        console.log('❌ [AUTH] Sign up failed:', error);
        
        // Check if the error is about user already existing
        if (
            error?.message?.includes('already exists') ||
            error?.message?.includes('already registered') ||
            error?.message?.includes('user exists')
        ) {
            console.log('ℹ️ [AUTH] User already exists');
            return { 
                success: true, 
                message: 'Account already exists. Please sign in.',
                data: { user: { email } }
            };
        }
        
        return { 
            success: false, 
            error: error?.message || 'Sign up failed'
        };
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({ body: { email, password } });
        return { success: true, data: response };
    } catch (error: any) {
        console.log('Sign in failed:', error);
        return { success: false, error: error?.message || 'Sign in failed' };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
        return { success: true };
    } catch (error: any) {
        console.log('Sign out failed:', error);
        return { success: false, error: error?.message || 'Sign out failed' };
    }
}