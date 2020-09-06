import { Machine, assign } from "xstate";
import userbase from "userbase-js";

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
						cond: (_context, event) => Boolean(event.data.user),
						actions: [assign({ user: (_context, event) => event.data.user })],
					},
					{
						target: "notSignedIn",
						actions: assign({ error: (_context, event) => event.data }),
					},
				],
				onError: {
					target: "error",
					actions: assign({ error: (_context, event) => event.data }),
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
				src: (_context, event) =>
					userbase.signIn({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "none",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (_context, event) => Boolean(event.data.user),
						actions: [assign({ user: (_context, event) => event.data.user })],
					},
					{
						target: "notSignedIn",
					},
				],
				onError: {
					target: "error",
					actions: assign({ error: (_context, event) => event.data }),
				},
			},
			on: {
				SIGNED_IN: "signedIn",
				NOT_SIGNED_IN: "notSignedIn",
			},
		},
		signedIn: {
			on: {
				LOGOUT: "notSignedIn",
			},
		},
		tryingSignUp: {
			invoke: {
				id: "userbaseSignUp",
				src: (_context, event) =>
					userbase.signUp({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "none",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (_context, event) => Boolean(event.data),
						actions: [assign({ user: (_context, event) => event })],
					},
					{
						target: "notSignedIn",
						actions: assign({ error: (_context, event) => event }),
					},
				],
				onError: {
					target: "notSignedIn",
					actions: assign({ error: (_context, event) => event }),
				},
			},
		},
		error: {
			type: "final",
		},
	},
});

export default loginStateMachine;
