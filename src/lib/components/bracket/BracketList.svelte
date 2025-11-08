<script lang="ts">
	import { getAllBrackets } from '$lib/remote/bracket.remote';
</script>

{#if (await getAllBrackets()).length > 0}
	<ul>
		{#each await getAllBrackets() as bracket (bracket.id)}
			<li>
				<a href={`/brackets/${bracket.id}`}>{bracket.name}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>No brackets found. Create a new bracket to get started.</p>
{/if}
