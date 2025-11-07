import { form } from '$app/server';
import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import * as z from 'zod';

const validatePasswordStrength = (password: string) => {
	// Check for at least one lowercase letter
	const hasLowerCase = /[a-z]/.test(password);
	// Check for at least one uppercase letter
	const hasUpperCase = /[A-Z]/.test(password);
	// Check for at least one number
	const hasNumber = /[0-9]/.test(password);
	// Check for at least one special character
	const hasSpecialChar = /[^a-zA-Z0-9]/.test(password);

	return hasLowerCase && hasUpperCase && hasNumber && hasSpecialChar;
};

const SignupSchema = z
	.object({
		email: z.email().min(1, 'Email is required'),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.refine(validatePasswordStrength, {
				message:
					'Password is not strong enough. Must contain at least one lowercase letter, one uppercase letter, one number, and one special character.'
			}),
		confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters')
	})
	.superRefine((data, ctx) => {
		if (data.password !== data.confirmPassword) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Passwords do not match'
			});
		}
	});

type SignupFields = z.infer<typeof SignupSchema>;

export const signupForm = form(SignupSchema, async (data: SignupFields) => {
	await auth.api.signUpEmail({
		body: {
			name: data.email.split('@')[0],
			email: data.email,
			password: data.password
		}
	});
	redirect(302, '/auth/signup/success');
});
