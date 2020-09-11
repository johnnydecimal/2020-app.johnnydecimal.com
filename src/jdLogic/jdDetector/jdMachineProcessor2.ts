// External modules
import { interpret } from "xstate";

// Internal modules
// import jdFileParser from './jdFileParser';
import jdMachine from "../../machines/jdParser";

// Types
import UserbaseData from "../types/UserbaseData";
import JDMachineProcessorOutput from "../types/jDMachineProcessorOutput";

/**
 * jdArrayCheck takes an array of UserbaseData objects and validates that they
 * collectively produce a valid JD system.
 *
 * If so, it returns this system ** AS WHAT HOW WHAT DO YOU WANT?? **
 *
 * @param {array} userbaseData An array of UserbaseData objects. That is, each
 *                                is an object { item: JDitem, itemId: guid}.
 */
const jdArrayCheck = (userbaseData: UserbaseData): JDMachineProcessorOutput => {
	// TODO: fix :any type
	// // Create the array of objects to analyse.
	// let detectedArray: Array<JDLineObject> = [];
	// let error: string | undefined;
	let error: any;
	let errorLine: Number | undefined;

	// detectedArray = jdFileParser(input);
	// // console.debug('detectedArray:', detectedArray);

	// Start the machine.
	const jdMachineService = interpret(jdMachine).start();

	// Run the array of objects through the machine.
	for (let i = 0; i < userbaseData.length; i++) {
		// XState expects a 'type' property. Might as well match it. This is
		// the transition.
		const type = userbaseData[i].item.jdType.toUpperCase();

		jdMachineService.send({
			type, // 'AREA', 'CATEGORY', etc.
			...userbaseData[i].item, // Also pass jdNumber, jdTitle for state context.
		});

		// If the state is now error, we capture which row it happened on.
		// TODO Fix the !TypeScript override
		if (jdMachineService.state.value === "error") {
			error = jdMachineService.state.context;
			errorLine = i + 1;
			break;
		}
	}

	// We're done. Return either success or error.
	if (jdMachineService.state.value !== "error") {
		jdMachineService.stop();
		// detectedArray might contain a bunch of blank lines here. Strip them.
		// TODO perhaps think about making this an option?
		const finalArray = userbaseData.filter(
			(item: { jdType: string }) => item.jdType !== "emptyline",
		);
		console.debug("🎆holy shit this worked");
		return {
			status: "success",
			jdArray: finalArray,
		};
	} else {
		console.debug("🧨dynamite! validation failed");
		jdMachineService.stop();
		return { status: "error", error, errorLine };
	}
};

export default jdArrayCheck;
