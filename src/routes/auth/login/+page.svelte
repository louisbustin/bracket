<script lang="ts">
	import { loginForm } from '$lib/remote/auth/login.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { FormFieldIssues } from '$lib/components/forms';
	import { getSession } from '$lib/remote/auth/session.remote';

	const session = await getSession();
</script>

<div class="mx-auto mt-0 flex max-w-md flex-col gap-4 md:mt-20 lg:mt-32">
	<h1 class="text-2xl font-bold">Login</h1>
	<p class="text-sm text-muted-foreground">
		Enter your email and password to login to your account.
	</p>
	<form {...loginForm}>
		<div class="flex flex-col gap-2">
			<div class="flex flex-col gap-2">
				<Label for="email">Email</Label>
				<Input {...loginForm.fields.email.as('email')} />
				<FormFieldIssues issues={loginForm.fields.email.issues?.()} />
			</div>
			<div class="flex flex-col gap-2">
				<Label for="password">Password</Label>
				<Input {...loginForm.fields.password.as('password')} />
				<FormFieldIssues issues={loginForm.fields.password.issues?.()} />
			</div>
			<Button type="submit">Sign in</Button>
			<FormFieldIssues issues={loginForm.fields.issues?.()} />
		</div>
	</form>
</div>
