import { Machine } from "@xstate/compiled";
// import { assign } from "xstate";
// import { Machine } from "xstate";
import userbase from "userbase-js";

// import JDMachineProcessor2 from "../jdLogic/jdDetector/jdMachineProcessor2";
import sortUserbaseData from "../userbase/sortUserbaseData";

interface DatabaseContext {
	setJdProject: Function;
}

interface DatabaseEvent {
	type: "PLACEHOLDER";
}

const databaseStateMachine = Machine<
	DatabaseContext,
	DatabaseEvent,
	"databaseMachine"
>({
	strict: true,

	id: "databaseState",
	initial: "init",

	states: {
		init: {
			invoke: {
				id: "userbaseDatabaseOpen",
				src: (context, _event): any => {
					userbase.openDatabase({
						databaseName: "test-2020-09-08-14-16",
						changeHandler: (userbaseData) => {
							console.debug("userbaseData:", userbaseData);
							console.debug(
								"sort[ed]UserbaseData:",
								sortUserbaseData(userbaseData)
								);
							// Need to test whether this is valid data and set the valid flag
							context.setJdProject({ data: sortUserbaseData(userbaseData) });
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
