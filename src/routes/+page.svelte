<script lang="ts">
	import { BracketList } from '$lib/components/bracket';
	import { getSession } from '$lib/remote/auth/session.remote';
</script>

This is the home page.

{#if (await getSession())?.user?.email}
	<BracketList />
	<a href="/brackets/create" class="text-sm text-muted-foreground">Create a new bracket</a>
{:else}
	Login to view your brackets and create new ones.
{/if}
