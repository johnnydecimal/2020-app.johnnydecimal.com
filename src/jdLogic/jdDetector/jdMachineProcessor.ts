// External modules
import { interpret } from "xstate";
// Internal modules
import jdFileParser from "./jdFileParser";
import jdMachine from "../../machines/jdParser";
// Types
import JDLineObject from "../../types/JDLineObject";
import JDMachineProcessorOutput from "../../types/jDMachineProcessorOutput";

/**
 * jdMachineProcessor takes a multi-line string and, using various helper
 * functions, determines whether it is valid JD. If so, an object with
 * { status: 'success', jdArray: [...] } is returned. If not, an object with
 * { status: 'error' } is returned.
 *
 * Blank lines in the original input are removed by this function.
 *
 * @param {string} input A string, 1+ lines long, of (potentially)
 *                       JD-formatted text to analyse.
 * @returns {object} An object of type JDMachineProcessorOutput.
 */
const jdMachineProcessor = (input: string): JDMachineProcessorOutput => {
	// Create the array of objects to analyse.
	let detectedArray: Array<JDLineObject> = [];
	let error: string | undefined;
	let errorLine: Number | undefined;

	detectedArray = jdFileParser(input);
	// console.debug('detectedArray:', detectedArray);

	// Start the machine.
	const jdMachineService = interpret(jdMachine).start();

	// Run the array of objects through the machine.
	for (let i = 0; i < detectedArray.length; i++) {
		// XState expects a 'type' property. Might as well match it. This is
		// the transition.
		const type = detectedArray[i].jdType.toUpperCase();

		jdMachineService.send({
			type, // 'AREA', 'CATEGORY', etc.
			...detectedArray[i], // Also pass jdNumber, jdTitle for state context.
		});

		// If the state is now error, we capture which row it happened on.
		// TODO Fix the !TypeScript override
		if (jdMachineService.state.value === "error") {
			// @ts-ignore
			error = jdMachineService.state.context.error;
			errorLine = i + 1;
			break;
		}
	}

	// We're done. Return either success or error.
	if (jdMachineService.state.value !== "error") {
		jdMachineService.stop();
		// detectedArray might contain a bunch of blank lines here. Strip them.
		// TODO perhaps think about making this an option?
		const finalArray = detectedArray.filter(
			(item) => item.jdType !== "emptyline"
		);
		return {
			status: "success",
			jdArray: finalArray,
		};
	} else {
		jdMachineService.stop();
		return { status: "error", error, errorLine };
	}
};

export default jdMachineProcessor;
