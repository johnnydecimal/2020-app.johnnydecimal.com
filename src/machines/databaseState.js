import { Machine } from "xstate";
import userbase from "userbase-js";

const databaseStateMachine = Machine({
	strict: "true",

	id: "databaseState",
	initial: "init",

	states: {
		init: {
			invoke: {
				id: "userbaseDatabaseOpen",
				src: (context) => {
					userbase.openDatabase({
						databaseName: "test-2020-09-08-14-16",
						changeHandler: (userbaseData) => {
							context.setJdData(userbaseData);
						},
					});
				},
				onDone: {
					target: "databaseOpen",
				},
				onError: {
					target: "error",
				},
			},
		},
		databaseOpen: {},
		error: {
			type: "final",
		},
	},
});

export default databaseStateMachine;
