import JDCategory from "../@types/JDCategory";

/**
 * isCategoryOrderValid returns true if the second category sequentially
 * follows the first category. e.g. '84' follows '12' (=> true) but '19' does
 * not follow '50' (=> false).
 *
 * No checks are performed to ensure that the categories belong to the same
 * area.
 *
 * @param {string} lower The first category to check.
 * @param {string} higher The second category to check.
 * @returns {boolean} `true` if they are sequential, `false` otherwise.
 */
const isAreaOrderValid = (lower: JDCategory, higher: JDCategory): boolean => {
	return Number(higher) > Number(lower);
};

export default isAreaOrderValid;
