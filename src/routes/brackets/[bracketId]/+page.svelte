<script lang="ts">
	import { FormFieldIssues } from '$lib/components/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { deleteBracket, getBracketById, updateBracket } from '$lib/remote/bracket.remote';
	import { goto } from '$app/navigation';

	let { params } = $props();
	let bracketId = $derived(Number(params.bracketId));

	let editBracket = $state(false);

	const handleDelete = async (bracketId: number) => {
		await deleteBracket(bracketId);
		await goto('/')
	}
</script>

<a href="/" class="text-sm text-muted-foreground">Back to brackets</a>

{#await getBracketById(bracketId) then bracket}
	{#if editBracket}
		<div class="mx-auto mt-0 flex max-w-md flex-col gap-4 md:mt-20 lg:mt-32">
			<h1 class="text-2xl font-bold">Edit bracket</h1>
			<p class="text-sm text-muted-foreground">
				Enter the name and description of your bracket to update it.
			</p>
			<form
				{...updateBracket.enhance(async ({ submit }) => {
					await submit();
					editBracket = false;
				})}
			>
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
				<Button onclick={() => (editBracket = false)}>Cancel</Button>
				<FormFieldIssues issues={updateBracket.fields.issues?.()} />
			</form>
		</div>
	{:else}
		<div class="mx-auto mt-0 flex max-w-md flex-col gap-4">
			<h1 class="text-2xl font-bold">{bracket.name}</h1>
			<p class="text-sm text-muted-foreground">{bracket.description}</p>
			<Button onclick={() => (editBracket = true)}>Edit bracket</Button>
			<Button variant="destructive" onclick={() => handleDelete(bracketId)}>Delete</Button>
		</div>
	{/if}
{:catch error}
	<p>Error loading bracket: {error.message}</p>
{/await}
