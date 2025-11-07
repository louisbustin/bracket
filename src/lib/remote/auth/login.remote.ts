import { form } from '$app/server';
import { auth } from '$lib/auth';
import { redirect } from '@sveltejs/kit';
import { BetterAuthError } from 'better-auth';
import * as z from 'zod';

export const loginForm = form(
	z.object({
		email: z.email().min(1, 'Email is required'),
		password: z.string().min(1, 'Password is required')
	}),
	async (data, invalid) => {
		try {
			const response = await auth.api.signInEmail({
				body: {
					email: data.email,
					password: data.password
				}
			});
		} catch (error) {
			console.error(error);
			invalid('Invalid email or password');
			return;
		}
	}
);
