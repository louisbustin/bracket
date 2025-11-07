<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { signupForm } from '$lib/remote/auth/signup.remote';
	import { FormFieldIssues } from '$lib/components/forms';
</script>

<div class="mx-auto mt-0 flex max-w-md flex-col gap-4 md:mt-20 lg:mt-32">
	<h1 class="text-2xl font-bold">Sign up</h1>
	<p class="text-sm text-muted-foreground">
		Enter your email and password to sign up for an account.
	</p>
	<form {...signupForm}>
		<div class="flex flex-col gap-2">
			<Label for="email">Email</Label>
			<Input {...signupForm.fields.email.as('email')} />
			<FormFieldIssues issues={signupForm.fields.email.issues?.()} />
		</div>
		<div class="flex flex-col gap-2">
			<Label for="password">Password</Label>
			<Input {...signupForm.fields.password.as('password')} />
			<FormFieldIssues issues={signupForm.fields.password.issues?.()} />
		</div>
		<div class="flex flex-col gap-2">
			<Label for="confirmPassword">Confirm Password</Label>
			<Input {...signupForm.fields.confirmPassword.as('password')} />
			<FormFieldIssues issues={signupForm.fields.confirmPassword.issues?.()} />
		</div>
		<Button type="submit">Sign up</Button>
	</form>
</div>
