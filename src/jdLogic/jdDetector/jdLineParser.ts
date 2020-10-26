import JDLineObject from "../../@types/JDLineObject";

/**
 * jdLineParser takes one line and parses it to see if it is a JD item.
 * If it is, an object containing the item is returned.
 * If it is not, an object with { jdType: 'error' } is returned.
 *
 * @param {string} input A single-line string to analyse.
 * @returns {object} An object of type ReturnValue.
 */
const jdLineParser = (input: string): JDLineObject => {
	const returnValue = {} as JDLineObject;
	let isProject, isArea, isCategory, isID, isDivider: any;

	input = input.trim();
	// -- Check for multi-line input and fail if so ----------------------------
	if (input.split("\n").length > 1) {
		return { jdType: "error", error: "Multi-line input not allowed." };
	}

	// -- The line could be empty ----------------------------------------------
	if (input === "") {
		returnValue.jdType = "emptyline";
		return returnValue;
	}

	// -- Look for a comment and pop it out if it exists -----------------------
	if (input.split("//").length === 2) {
		returnValue.comment = input.split("//")[1].trim();
		// Remove the comment from the input
		input = input.split("//")[0].trim();
		// If the entire line was a comment, that's cool. Act accordingly.
		if (input === "") {
			returnValue.jdType = "comment";
			return returnValue;
		}
	}

	// -- Check for a Project ('100 My great project') -------------------------
	isProject = /^(\d\d\d )( *)(.*)/.exec(input);
	if (isProject) {
		returnValue.jdType = "project";
		returnValue.jdNumber = isProject[1].trim();
		returnValue.jdTitle = isProject[3].trim();
		return returnValue;
	}

	// -- Check for an Area ('10-19 My special area') --------------------------
	isArea = /^(\d\d-\d\d )( *)(.*)/.exec(input);
	if (isArea) {
		// -- Check if the Area number is formatted correctly --------------------
		const areaFormatCheck = isArea[1].split("-");
		// The first number mut be a divisor of ten, and
		// the second number must be 9 more than the first number
		if (
			Number(areaFormatCheck[0]) % 10 === 0 &&
			Number(areaFormatCheck[1]) - Number(areaFormatCheck[0]) === 9
		) {
			returnValue.jdType = "area";
			returnValue.jdNumber = isArea[1].trim();
			returnValue.jdTitle = isArea[3].trim();
			return returnValue;
		}
	}

	// -- Check for a Category ('10 My cool category') -------------------------
	isCategory = /^(\d\d )( *)(.*)/.exec(input);
	if (isCategory) {
		returnValue.jdType = "category";
		returnValue.jdNumber = isCategory[1].trim();
		returnValue.jdTitle = isCategory[3].trim();
		return returnValue;
	}

	// -- Check for an ID ('12.34 My interesting ID') --------------------------
	isID = /^(\d\d\.\d\d )( *)(.*)/.exec(input);
	if (isID) {
		returnValue.jdType = "id";
		returnValue.jdNumber = isID[1].trim();
		returnValue.jdTitle = isID[3].trim();
		return returnValue;
	}

	// -- Check for a divider line ('----', any number of) ---------------------
	isDivider = /^-+$/.exec(input);
	if (isDivider) {
		returnValue.jdType = "divider";
		returnValue.comment = input;
		return returnValue;
	}

	// -- Nothing found --------------------------------------------------------
	return { jdType: "error", error: "Nothing matched." };
};

export default jdLineParser;
