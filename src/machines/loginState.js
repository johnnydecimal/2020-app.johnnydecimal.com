import { Machine, assign } from "xstate";
import userbase from "userbase-js";
import { navigate } from "@reach/router";

export const loginStateMachine = Machine({
	strict: "true",

	id: "loginState",
	initial: "init",

	context: {
		user: undefined,
	},

	states: {
		init: {
			invoke: {
				id: "userbaseInit",
				src: () =>
					userbase.init({
						appId: "37c7462e-f79c-4ef3-bdb0-55968a34d572",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (context, event) => Boolean(event.data.user),
						actions: [assign({ user: (context, event) => event.data.user })],
					},
					{
						target: "notSignedIn",
						actions: assign({ error: (context, event) => event.data }),
					},
				],
				onError: {
					target: "error",
					actions: assign({ error: (context, event) => event.data }),
				},
			},
		},
		notSignedIn: {
			on: {
				TRY_SIGNIN: "tryingSignIn",
				TRY_SIGNUP: "tryingSignUp",
			},
		},
		tryingSignIn: {
			invoke: {
				id: "userbaseSignIn",
				src: (context, event) =>
					userbase.signIn({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "local",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (context, event) => Boolean(event.data.username),
						actions: [
							assign({ user: (context, event) => event.data }),
							assign({ error: null }),
							(context, event) =>
								console.log("🚜tryingSignIn/onDone/event:", event),
						],
					},
					{
						/* We should never reach this onDone-but-no-user-in-the-event 
						 condition. If the login fails, the promise rejects and we
						 transition to `onError`. If the login succeeds, the `cond:` will
						 always be met, and we'll always transition as above. *But*, just
						 in case, I'm going to leave this here and send it to `error`.
						 If we've ended up here, something truly weird is happening and it
						 needs your attention.
					*/
						target: "error",
					},
				],
				onError: {
					target: "notSignedIn",
					actions: assign({ error: (context, event) => event.data }),
				},
			},
			on: {
				SIGNED_IN: "signedIn",
				NOT_SIGNED_IN: "notSignedIn",
			},
		},
		signedIn: {
			on: {
				TRY_SIGNOUT: "tryingSignOut",
			},
		},
		tryingSignUp: {
			invoke: {
				id: "userbaseSignUp",
				src: (context, event) =>
					userbase.signUp({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "local",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (context, event) => Boolean(event.data),
						actions: [assign({ user: (context, event) => event })],
					},
					{
						target: "notSignedIn",
						actions: assign({ error: (context, event) => event }),
					},
				],
				onError: {
					target: "notSignedIn",
					actions: assign({ error: (context, event) => event }),
				},
			},
		},
		tryingSignOut: {
			invoke: {
				id: "userbaseSignOut",
				src: () => userbase.signOut(),
				onDone: [
					{
						target: "notSignedIn",
						actions: [assign({ user: null }), () => navigate("/")],
					},
				],
				onError: {
					target: "notSignedIn",
					actions: assign({
						error: (context, event) => event,
						user: null,
					}),
				},
			},
		},
		error: {
			type: "final",
		},
	},
});

export default loginStateMachine;
