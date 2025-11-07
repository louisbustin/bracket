<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { signupForm } from '$lib/remote/auth/signup.remote';
	import { FormFieldIssues } from '$lib/components/forms';
	import { getSession } from '$lib/remote/auth/session.remote';
</script>

<form {...signupForm}>
	<Label for="email">Email</Label>
	<Input {...signupForm.fields.email.as('email')} />
	<FormFieldIssues issues={signupForm.fields.email.issues?.()} />
	<Label for="password">Password</Label>
	<Input {...signupForm.fields.password.as('password')} />
	<FormFieldIssues issues={signupForm.fields.password.issues?.()} />
	<Label for="confirmPassword">Confirm Password</Label>
	<Input {...signupForm.fields.confirmPassword.as('password')} />
	<FormFieldIssues issues={signupForm.fields.confirmPassword.issues?.()} />
	<Button type="submit">Sign up</Button>
</form>
