import JDCategory from "../@types/JDCategory";
import JDID from "../@types/JDID";

/**
 * isIDInCategory returns true if the id is a member of the category, e.g.
 * '99.24' is a member of '99' (=> true) but '40.00' is not a member of
 * '73' (=> false).
 *
 * @param {string} category
 * @param {string} id
 * @returns {boolean} `true` if the is is in the category, `false` otherwise.
 */
const isIDInCategory = (category: JDCategory, id: JDID): boolean => {
	// These things are both strings. Don't bother converting them.
	// This checks whether the string 'category' followed by a period is found
	// at the start of the id.
	return id.indexOf(`${category}.`) === 0;
};

export default isIDInCategory;
