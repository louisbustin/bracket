<script lang="ts">
	import { getBracketById } from '$lib/remote/bracket.remote';

	let { params } = $props();
	let bracketId = $derived(Number(params.bracketId));
</script>

{#await getBracketById(bracketId) then bracket}
	<div class="mx-auto mt-0 flex max-w-md flex-col gap-4">
		<h1 class="text-2xl font-bold">{bracket.name}</h1>
		<p class="text-sm text-muted-foreground">{bracket.description}</p>
		<a href={`/brackets/${params.bracketId}/edit`} class="text-sm text-muted-foreground"
			>Edit bracket</a
		>
	</div>
{:catch error}
	<p>Error loading bracket: {error.message}</p>
{/await}
