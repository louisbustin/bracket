import { getRequestEvent, query } from '$app/server';
import { auth } from '$lib/auth';

export const getSession = query(async () => {
	console.log('getSession');
	const session = await auth.api.getSession({
		headers: getRequestEvent().request.headers
	});
	return session;
});
