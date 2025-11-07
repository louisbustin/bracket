<script lang="ts">
	import type { RemoteFormIssue } from '@sveltejs/kit';

	export type FormFieldIssuesProps = {
		issues?: RemoteFormIssue[];
	};
	let { issues }: FormFieldIssuesProps = $props();
</script>

<div class="text-red-500">
	{#each issues || [] as issue}
		<p>{issue.message}</p>
	{/each}
</div>
