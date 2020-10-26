import { Machine } from "@xstate/compiled";
// import { assign } from "xstate";
// import { Machine } from "xstate";
import userbase from "userbase-js";

// import JDMachineProcessor2 from "../jdLogic/jdDetector/jdMachineProcessor2";
import sortUserbaseData from "../userbase/sortUserbaseData";
import jdProjectMachineRunner from "../jdLogic/jdProjectMachineRunner";

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
							console.debug("🥎 userbaseData:");
							console.debug(userbaseData);
							// Need to test whether this is valid data and set the valid flag
							// Run the current project through the runner
							const jdProjectMachineRunnerResult = jdProjectMachineRunner({
								status: "tbc",
								data: userbaseData,
							});
							if ((jdProjectMachineRunnerResult.status = "valid")) {
								console.debug(
									"✅ userbaseState.machine:changeHander - valid project received from Userbase"
								);
								context.setJdProject({ data: sortUserbaseData(userbaseData) });
							} else {
								console.error(
									"🚨 userbaseState.machine:changeHander - invalid project received from Userbase, taking no action"
								);
							}
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
