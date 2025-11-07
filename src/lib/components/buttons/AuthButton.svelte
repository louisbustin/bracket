<script lang="ts">
	import { LogIn, LogOut } from '@lucide/svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';

	import { getSession } from '$lib/remote/auth/session.remote';
	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';
</script>

{#if await getSession()}
	<Button
		variant="outline"
		size="icon"
		onclick={async () => {
			await authClient.signOut();
			await getSession().refresh();
			goto('/');
		}}
	>
		<LogOut class="h-[1.2rem] w-[1.2rem]" />
		<span class="sr-only">Log out</span>
	</Button>
{:else}
	<a class={buttonVariants({ variant: 'outline', size: 'icon' })} href="/auth/login">
		<LogIn class="h-[1.2rem] w-[1.2rem]" />
		<span class="sr-only">Log in</span>
	</a>
{/if}
