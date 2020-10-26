/**
 * # isArea
 *
 * Is the string passed to the function a valid JD area? Remember, areas must
 * look like `00-09` ... `99-99`. `12-34` is *not* a valid area.
 *
 * ## Inputs
 *
 * 1. A string to test.
 * @param {string} areaTest
 *
 * ## Process
 *
 * - Check for the regex pattern.
 * - Check for the x0-x9 pattern.
 *
 * ## Outputs
 *
 * 1. `true` if it's an area, `false` if it ain't.
 * @returns {boolean}
 */
const isArea = (areaTest: string): Boolean => {
	// Does it pass the simple regex test?
	if (/^[0-9][0-9]-[0-9][0-9]$/.test(areaTest)) {
		// Does it pass the x0-x9 pattern test?
		const areaFormatCheck = areaTest.split("-");
		// The first number mut be a divisor of ten, and
		// the second number must be 9 more than the first number
		if (
			Number(areaFormatCheck[0]) % 10 === 0 &&
			Number(areaFormatCheck[1]) - Number(areaFormatCheck[0]) === 9
		) {
			return true;
		}
	}
	// Otherwise...
	return false;
};

export default isArea;
