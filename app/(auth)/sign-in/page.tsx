'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import InputField from '@/components/forms/InputField';
import FooterLink from '@/components/forms/FooterLink';
import { signInWithEmail } from "@/lib/actions/auth.actions"; // Removed signUpWithEmail import
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            console.log('🟡 [CLIENT] Starting sign in...');
            
            const result = await signInWithEmail(data);
            
            console.log('🟡 [CLIENT] Sign in result:', result);
            
            if (result.success) {
                console.log('✅ [CLIENT] Sign in successful!');
                toast.success('Signed in successfully!');
                
                // Redirect to home page
                router.push('/');
                router.refresh();
            } else {
                console.log('❌ [CLIENT] Sign in failed:', result.error);
                toast.error('Sign in failed', {
                    description: result.error || 'Invalid email or password.'
                });
            }
        } catch (error: any) {
            console.error('🔥 [CLIENT] Unexpected error:', error);
            toast.error('Sign in failed', {
                description: error?.message || 'Failed to sign in.'
            });
        }
    };

    return (
        <>
            <h1 className="form-title">Welcome back</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{ 
                        required: 'Email is required', 
                        pattern: { 
                            value: /^\w+@\w+\.\w+$/, 
                            message: 'Invalid email format' 
                        } 
                    }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ 
                        required: 'Password is required', 
                        minLength: { 
                            value: 8, 
                            message: 'Password must be at least 8 characters' 
                        } 
                    }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Signing In' : 'Sign In'}
                </Button>

                <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
            </form>
        </>
    );
};

export default SignIn;