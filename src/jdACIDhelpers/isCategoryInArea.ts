import JDArea from "../@types/JDArea";
import JDCategory from "../@types/JDCategory";
import isArea from "./isArea";
import isCategory from "./isCategory";

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
	if (!isArea(area)) {
		throw new Error(
			"isCategoryInArea.ts: you passed something claiming to be an area that is not an area"
		);
	}
	if (!isCategory(category)) {
		throw new Error(
			"isCategoryInArea.ts: you passed something claiming to be a category that is not a category"
		);
	}

	return Number(area.charAt(0)) === Number(category.charAt(0));
};

export default isCategoryInArea;
