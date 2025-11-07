<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { getSession } from '$lib/remote/auth/session.remote';
	import { authClient } from '$lib/auth-client';
	const session = await getSession();
</script>

<pre>{JSON.stringify(session, null, 2)}</pre>

<h1>Signup successful</h1>

<Button
	onclick={() => {
		authClient.signOut();
	}}>Sign out</Button
>
