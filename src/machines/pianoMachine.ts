import { Machine, interpret, assign, DoneInvokeEvent } from "xstate";

interface User {
	name: string;
	id: string;
}

interface UserMachineContext {
	userId: string;
	user: User | undefined;
	error: string | undefined;
}

// Edit your machine(s) here
// Function that returns a promise
// This promise might resolve with, e.g.,
// { name: 'David', location: 'Florida' }
const fetchUser: (userId: string) => Promise<User> = (userId) => {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res({ name: "David", id: userId });
		}, 2000);
	});
};

const userMachine = Machine<UserMachineContext>({
	id: "user",
	initial: "idle",
	context: {
		userId: "42",
		user: undefined,
		error: undefined,
	},
	states: {
		idle: {
			on: {
				FETCH: "loading",
			},
		},
		loading: {
			invoke: {
				id: "getUser",
				src: (context, event) => fetchUser(context.userId),
				onDone: {
					target: "success",
					actions: assign<UserMachineContext, DoneInvokeEvent<User>>({
						user: (context, event) => event.data,
					}),
				},
				onError: {
					target: "failure",
					actions: assign({ error: (context, event) => event.data }),
				},
			},
		},
		success: {},
		failure: {
			on: {
				RETRY: "loading",
			},
		},
	},
});
