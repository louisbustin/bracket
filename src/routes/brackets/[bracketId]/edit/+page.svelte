<script lang="ts">
	import { updateBracket } from '$lib/remote/bracket.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { FormFieldIssues } from '$lib/components/forms';
	import { getBracketById } from '$lib/remote/bracket.remote';
	let { params } = $props();

	let bracketId = $derived(Number(params.bracketId));
</script>

{#if getBracketById(bracketId).ready}
	<div class="mx-auto mt-0 flex max-w-md flex-col gap-4 md:mt-20 lg:mt-32">
		<h1 class="text-2xl font-bold">Edit bracket</h1>
		<p class="text-sm text-muted-foreground">
			Enter the name and description of your bracket to update it.
		</p>
		<form {...updateBracket}>
			<input {...updateBracket.fields.id.as('hidden', params.bracketId)} />
			<div class="flex flex-col gap-2">
				<Label for="name">Name</Label>
				<Input
					{...updateBracket.fields.name.as('text')}
					value={(await getBracketById(bracketId))?.name}
				/>
				<FormFieldIssues issues={updateBracket.fields.name.issues?.()} />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="description">Description</Label>
				<Input
					{...updateBracket.fields.description.as('text')}
					value={(await getBracketById(bracketId))?.description}
				/>
				<FormFieldIssues issues={updateBracket.fields.description.issues?.()} />
			</div>
			<Button type="submit">Update bracket</Button>
			<FormFieldIssues issues={updateBracket.fields.issues?.()} />
		</form>
	</div>
{:else}
	<p>Loading bracket...</p>
{/if}
