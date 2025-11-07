<script lang="ts">
	import { loginForm } from '$lib/remote/auth/login.remote';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { FormFieldIssues } from '$lib/components/forms';
	import { getSession } from '$lib/remote/auth/session.remote';

	const session = await getSession();
</script>

<form {...loginForm}>
	<Label for="email">Email</Label>
	<Input {...loginForm.fields.email.as('email')} />
	<FormFieldIssues issues={loginForm.fields.email.issues?.()} />
	<Label for="password">Password</Label>
	<Input {...loginForm.fields.password.as('password')} />
	<FormFieldIssues issues={loginForm.fields.password.issues?.()} />
	<Button type="submit">Sign in</Button>
	<FormFieldIssues issues={loginForm.fields.issues?.()} />
</form>

<pre>{JSON.stringify(session, null, 2)}</pre>
