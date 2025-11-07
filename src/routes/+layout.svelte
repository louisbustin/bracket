<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { DarkModeButton, AuthButton } from '$lib/components/buttons';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>
<ModeWatcher />
<header
	class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
>
	<div
		class="mx-auto flex h-14 w-full max-w-7xl items-center justify-end gap-2 px-4 sm:px-6 lg:px-8"
	>
		<DarkModeButton />
		<AuthButton />
	</div>
</header>
<div class="min-h-screen bg-background">
	<main class="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
		{@render children()}
	</main>
</div>
