# Building the login form

Goal:

- Be able to create an account.
- Be able to log in.
- Have that login be persistent on a reload.
- Be able to log out.
- All with a state machine.
- Nothing else. Don't give a shit how it looks at this point, just build it.

Later:

- Make it pretty.

Also:

- Do you want to document how you do it?
- Or retro-document it?
  - This _is_ going to be invaluable for promotion, and a Userbase/XState/Tailwind starter is a nice thing to give to the world.
- For now, just get a win on the board. You need to be moving forward with the actual app. No point thinking about a thing which so far has refused to exist.
- Be nice to build some tests in here while we do this. Remember how nice tests are?

So how do we achieve this?

- [x] Review the other repo, you've already built a bunch of this.
- [ ] Get the state machine in _first_ without thinking about Userbase. Just mock whatever needs to be mocked.
- [ ] Just do and test one state at a time.
- [ ] Review the Userbase documentation.

Might as well document the _high level steps_ though.

- Install XState.
  - `npm i xstate @xstate/react`
- Nope, you just don't remember to do this. Come back and do it after.

# Reading the Userbase docs

- Remember the `rememberMe` option.
