import { Machine } from "@xstate/compiled";
import { assign, DoneInvokeEvent } from "xstate";
import userbase from "userbase-js";
import { navigate } from "@reach/router";

interface User {
	username: string;
	userId: string;
	authToken: string;
	creationDate: string;
	paymentsMode: string;
	email?: string;
	profile?: object;
	protectedProfile?: object;
	subscriptionStatus?: string;
	trialExpirationDate?: string;
	cancelSubscriptionAt?: string;
}

interface UserbaseSessionObject {
	user: User;
}

export interface SignInContext {
	error: any | undefined;
	formData: any | undefined;
	user: User | undefined | any;
}

// prettier-ignore
export type SignInEvent =
	| { type: "TRY_SIGNIN", formData: any }
	| { type: "TRY_SIGNUP", formData: any }
	| { type: "SIGNED_IN", formData: any }
	| { type: "NOT_SIGNED_IN", formData: any }
	| { type: "TRY_SIGNOUT", formData: any };

const newSignInStateMachine = Machine<
	SignInContext,
	SignInEvent,
	"newSignInState"
>({
	strict: true,
	id: "newSignInState",
	initial: "init",

	context: {
		error: undefined,
		formData: undefined,
		user: undefined,
	},

	states: {
		init: {
			invoke: {
				id: "userbaseInit",
				src: (_context, _event) =>
					userbase.init({
						appId: "37c7462e-f79c-4ef3-bdb0-55968a34d572",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (_context, event) => Boolean(event.data.user),
						actions: [
							assign({
								// This needs the `| any` on the end of the Context:user type.
								user: (_context, event) => event.data.user,
							}),
							(_context, event) =>
								console.debug("🌹 invoke: onDone: event:", event),
						],
					},
					{
						target: "notSignedIn",
						actions: assign({
							error: (_context, event) => event.data,
						}),
					},
				],
				onError: {
					target: "error",
					actions: assign({
						error: (_context, event) => event.data,
					}),
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
				id: "userbaseInit",
				src: (_context, event) =>
					userbase.signIn({
						username: event.formData.username,
						password: event.formData.password,
						rememberMe: "local",
					}),
				onDone: [
					{
						target: "signedIn",
						cond: (_context, event) => {
							console.debug("🆔 event: ", event);
							return Boolean(event.data.userId);
						},
						actions: [
							assign({
								user: (_context, event) => event.data.user,
							}),
							(_context, event) =>
								console.debug("🌹 tryingSIgnIn: invoke: onDone: event:", event),
						],
					},
					{
						target: "notSignedIn",
						actions: assign({
							error: (_context, event) => event.data,
						}),
					},
				],
				onError: {
					target: "error",
					actions: assign({
						error: (_context, event) => event.data,
					}),
				},
			},
		},
		signedIn: {
			on: {
				TRY_SIGNOUT: "tryingSignOut",
			},
		},
		tryingSignUp: {},
		tryingSignOut: {
			invoke: {
				id: "tryingSignOut",
				src: (_context, _event) => userbase.signOut(),
				onDone: {
					target: "notSignedIn",
					actions: [
						assign({ user: (_context, _event) => undefined }),
						() => navigate("/"),
					],
				},
				onError: {
					target: "notSignedIn",
					actions: [
						assign({
							user: (_context, _event) => undefined,
							error: (_context, event) => event,
						}),
						() => navigate("/"),
					],
				},
			},
		},
		error: {
			type: "final",
		},
	},
});

export default newSignInStateMachine;
