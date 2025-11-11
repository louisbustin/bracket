import { command, form, query } from '$app/server';
import { db } from '$lib/server/db';
import { and, eq } from 'drizzle-orm';
import { getSession } from './auth/session.remote';
import { bracket } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import * as z from 'zod';
import { AwardIcon } from '@lucide/svelte';

const BracketValidationSchema = z.object({
	id: z.string().transform(Number),
	name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
	description: z
		.string()
		.min(1, 'Description is required')
		.max(1000, 'Description must be less than 1000 characters')
});

export const getAllBrackets = query(async () => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/auth/login');
	}
	const brackets = await db.query.bracket.findMany({
		where: eq(bracket.userId, session?.user.id)
	});
	return brackets;
});

export const getBracketById = query(z.number(), async (id) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/auth/login');
	}
	const bracketData = await db.query.bracket.findFirst({
		where: and(eq(bracket.id, id), eq(bracket.userId, session?.user.id))
	});
	if (!bracketData) {
		throw error(404, 'Bracket not found');
	}
	return bracketData;
});

export const createBracket = form(BracketValidationSchema.omit({ id: true }), async (data) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/auth/login');
	}
	const [bracketData] = await db
		.insert(bracket)
		.values({
			name: data.name,
			description: data.description,
			userId: session?.user.id
		})
		.returning();

	redirect(302, `/brackets/${bracketData.id}`);
});

export const updateBracket = form(BracketValidationSchema, async (data) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/auth/login');
	}
	await db
		.update(bracket)
		.set({
			name: data.name,
			description: data.description
		})
		.where(and(eq(bracket.id, data.id), eq(bracket.userId, session?.user.id)));
});

export const deleteBracket = command(z.number(), async (bracketId) => {
	const session = await getSession();
	if (!session) {
		redirect(302, '/auth/login');
	}
	await db
		.delete(bracket)
		.where(and(eq(bracket.id, bracketId), eq(bracket.userId, session?.user.id)));

});
