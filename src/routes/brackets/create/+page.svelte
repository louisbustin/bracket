<script lang="ts">
	import { createBracket } from '$lib/remote/bracket.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { FormFieldIssues } from '$lib/components/forms';
</script>

<div class="mx-auto mt-0 flex max-w-md flex-col gap-4 md:mt-20 lg:mt-32">
	<h1 class="text-2xl font-bold">Create a new bracket</h1>
	<p class="text-sm text-muted-foreground">
		Enter the name and description of your bracket to create a new one.
	</p>
	<form {...createBracket}>
		<div class="flex flex-col gap-2">
			<Label for="name">Name</Label>
			<Input {...createBracket.fields.name.as('text')} />
			<FormFieldIssues issues={createBracket.fields.name.issues?.()} />
		</div>
		<div class="flex flex-col gap-2">
			<Label for="description">Description</Label>
			<Input {...createBracket.fields.description.as('text')} />
			<FormFieldIssues issues={createBracket.fields.description.issues?.()} />
		</div>
		<Button type="submit">Create bracket</Button>
		<FormFieldIssues issues={createBracket.fields.issues?.()} />
	</form>
</div>
