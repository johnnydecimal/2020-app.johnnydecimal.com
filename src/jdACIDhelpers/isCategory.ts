/**
 * # isCategory
 *
 * Is the string passed to the function a valid JD category?
 *
 * ## Inputs
 *
 * 1. A string to test.
 * @param {string} categoryTest
 *
 * ## Process
 *
 * - Check for the regex pattern.
 *
 * ## Outputs
 *
 * 1. `true` if it's a category, `false` if it ain't.
 * @returns {boolean}
 */
const isCategory = (categoryTest: string): Boolean => {
	// Does it pass the simple regex test?
	if (/^[0-9][0-9]$/.test(categoryTest)) {
		return true;
	}
	// Otherwise...
	return false;
};

export default isCategory;
