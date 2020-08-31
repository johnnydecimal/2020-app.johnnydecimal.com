import { Machine, assign } from "xstate";
// import userbase from "userbase-js";

export const loginStateMachine = Machine({
	strict: "true",

	id: "loginState",
	initial: "init",

	context: {
		user: undefined,
	},

	states: {
		init: {
			on: {
				LOGGED_IN: "loggedIn",
				NOT_LOGGED_IN: "notLoggedin",
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
	},
});

export default loginStateMachine;
