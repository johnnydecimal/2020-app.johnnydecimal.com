import { Machine } from "xstate";
import userbase from "userbase-js";

// import JDMachineProcessor2 from "../jdLogic/jdDetector/jdMachineProcessor2";
import sortUserbaseData from "../jdLogic/helpers/sortUserbaseData";

const databaseStateMachine = Machine({
	strict: true,

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
							console.debug("userbaseData:", userbaseData);
							context.setJdData(sortUserbaseData(userbaseData));
							// prettier-ignore
							console.debug(
								"sort[ed]UserbaseData:",
								sortUserbaseData(userbaseData)
							);
							// context.setJdData(userbaseData);
							// JDMachineProcessor2(userbaseData);
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
