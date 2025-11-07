<script lang="ts">
	import { getSession } from '$lib/remote/auth/session.remote';
</script>

This is the home page.

{#if (await getSession())?.user?.email}
	You are logged in as {(await getSession())?.user?.email}.
{:else}
	You are not logged in.
{/if}
