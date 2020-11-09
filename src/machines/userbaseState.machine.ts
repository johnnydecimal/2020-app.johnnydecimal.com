// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Machine } from "xstate";
import userbase from "userbase-js";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import sortUserbaseData from "../userbase/sortUserbaseData";
import jdProjectMachineRunner from "../jdProjectMachineRunner/jdProjectMachineRunner";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
interface DatabaseContext {
	setJdProject: Function;
}

interface DatabaseSchema {
	states: {
		init: {};
		databaseOpen: {};
		error: {};
	};
}

interface DatabaseEvent {
	type: "PLACEHOLDER";
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const databaseStateMachine = Machine<
	DatabaseContext,
	DatabaseSchema,
	DatabaseEvent
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
							// TODO: Why won't eslint & prettier play nice here? Prettier
							//       insists on wrapping this in () if it's `=`, and eslint
							//       doesn't report the no-cond-assign error either way.
							if (jdProjectMachineRunnerResult.status === "valid") {
								console.debug(
									"✅ userbaseState.machine:changeHander - valid project received from Userbase"
								);
								context.setJdProject({ data: sortUserbaseData(userbaseData) });
							} else {
								console.error(
									"🚨 userbaseState.machine:changeHander - invalid project received from Userbase, taking no action"
								);
								throw new Error(
									"The project as stored on Userbase is corrupt. Fix it manually then refresh."
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
