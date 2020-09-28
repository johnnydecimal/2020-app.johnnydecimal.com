// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import isArea from "../jdACIDhelpers/isArea";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDArea from "../types/JDArea";

/**
 * isAreaOrderValid returns true if the second area sequentially follows the
 * first area. e.g. '20-29' follows '10-19' (=> true) but '40-49' does not
 * follow '50-59' (=> false).
 *
 * @param {string} first The first area to check.
 * @param {string} second The second area to check.
 * @returns {boolean} `true` if they are sequential, `false` otherwise.
 * @throws Throws an error if you manage to pass it something that isn't an
 *          area.
 */
const isAreaOrderValid = (first: JDArea, second: JDArea): boolean => {
	if (!isArea(first) && !isArea(second)) {
		throw new Error(
			"🚨 isAreaOrderValid.ts: one of the parameters supplied is not an area."
		);
	}
	return Number(second.charAt(0)) > Number(first.charAt(0));
};

export default isAreaOrderValid;
