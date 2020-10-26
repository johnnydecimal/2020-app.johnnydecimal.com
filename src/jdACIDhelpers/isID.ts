/**
 * # isID
 *
 * Is the string passed to the function a valid JD ID?
 *
 * ## Inputs
 *
 * 1. A string to test.
 * @param {string} idTest
 *
 * ## Process
 *
 * - Check for the regex pattern.
 *
 * ## Outputs
 *
 * 1. `true` if it's an area, `false` if it ain't.
 * @returns {boolean}
 */
const isID = (idTest: string): Boolean => {
	// Does it pass the simple regex test?
	if (/^[0-9][0-9]\.[0-9][0-9]$/.test(idTest)) {
		return true;
	}
	// Otherwise...
	return false;
};

export default isID;
