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
						target: "loggedIn",
						cond: (_, event) => Boolean(event.data.user),
						actions: [assign({ user: (_, event) => event.data.user })],
					},
					{
						target: "notLoggedin",
					},
				],
				onError: {
					target: "error",
					actions: assign({ error: (_, event) => event.data }),
				},
			},
		},
		notLoggedin: {
			on: {
				TRY_LOGIN: "tryingLogin",
			},
		},
		tryingLogin: {
			on: {
				LOGGED_IN: "loggedIn",
				NOT_LOGGED_IN: "notLoggedin",
			},
		},
		loggedIn: {
			on: {
				LOGOUT: "notLoggedin",
			},
		},
		error: {
			type: "final",
		},
	},
});

export default loginStateMachine;
