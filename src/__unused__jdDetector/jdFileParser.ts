import jdLineParser from "./jdLineParser";
import JDLineObject from "../@types/JDLineObject";

/**
 * jdFileParser takes a multi-line string and feeds each non-blank line to
 * jdLineParser. It is non-failing, in that incorrect lines will be returned
 * with { jdType: 'error' } but the function will continue to process the
 * input.
 *
 * This function returns { jdType: 'emptyline' }. It is the job of
 * jdMachineProcessor to remove these blank lines before returning the final
 * object.
 *
 * @param {string} input A multi-line string to be analysed.
 * @returns {array} An array of objects. Each object has type ReturnValue.
 *                  If the input is blank, an empty array is returned.
 */
const jdFileParser = (input: string): Array<JDLineObject> => {
	// If there's nothing to process, return an empty array.
	if (input === "") return [];

	let detectedArray: Array<JDLineObject> = [];

	let lines = input.split("\n");
	lines.forEach((line: string) => {
		// We don't return empty lines. If you choose to display empty lines
		// in your output that's a display formatting decision.
		// Update: yeah we do, at this point, so we can accurately capture
		// which line an error occurred on. If we strip all blanks, this breaks.
		detectedArray.push(jdLineParser(line));
	});

	return detectedArray;
};

export default jdFileParser;
