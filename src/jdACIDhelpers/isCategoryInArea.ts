import JDArea from "../@types/JDArea";
import JDCategory from "../@types/JDCategory";

/**
 * isCategoryInArea returns true if the category is a member of the area, e.g.
 * '34' is a member of '30-39' (=> true) but '40' is not a member of '90-99'
 * (=> false).
 *
 * @param {string} area
 * @param {string} category
 * @returns {boolean} `true` if the category is in the area, `false` otherwise.
 */
const isCategoryInArea = (area: JDArea, category: JDCategory): boolean => {
	return Number(area.charAt(0)) === Number(category.charAt(0));
};

export default isCategoryInArea;
