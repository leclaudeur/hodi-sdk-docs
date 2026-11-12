---
title: "Sign-in"
description: "Another way in, a sign-up, a page in place of Sign in or a step right after it."
intro: "The screens around signing in: another way in, a sign-up, a page in place of Sign in or a step right after it."
order: 6
icon: "log-in"
topic: "sport"
key: "signInExtras"
---

Before a profile is open, Hodi only loads the plugins that have the `publicRoutes` permission. Only they can draw these screens, and their public routes answer there.

## The slots

- **`signInExtras`**: under the Sign in form, such as "Create my household".
- **`signedOutPage`**: a page in place of Sign in, on a device without a household.
- **`afterSignIn`**: a step once signed in, before the app, such as "Which household?".
- **`whoIsReadingFooter`**: buttons next to "Manage profiles", under "Who's in?".
- **`ageConsent`**: a line after "I am at least 13", with its links.

## Example

```tsx title="web/index.tsx"
const SignUp = ({ signedIn }) => {
  const publicApi = usePluginPublicApi()
  const join = async () => {
    const answer = await publicApi('/signup', { method: 'POST', body: … })
    if (answer.ok) signedIn()
  }
  return <Button onClick={join}>Create my household</Button>
}

definePlugin({ signInExtras: SignUp })
```

## Good to know

- **Signing someone in**: a public route answers with `signIn` and the id of an account it has just created or checked. Hodi sets up the session itself, with the `signIn` permission.
- **Refusing a sign-in**: `checkSignIn`, called at every sign-in, can refuse it.
- **The limits**: no request to another site, 30 per minute at most.
