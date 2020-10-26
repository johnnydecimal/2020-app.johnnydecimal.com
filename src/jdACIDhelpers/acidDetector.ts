import isArea from "./isArea";
import isCategory from "./isCategory";
import isID from "./isID";

type ACIDDetectorReturn = "area" | "category" | "id" | false;

/**
 * # AC.ID Detector
 *
 * Give it a string and it tells you whether it's an area, category, ID, or
 * not.
 *
 * ## Inputs
 *
 * 1. A string.
 * @param {string} acidInput - The string to test.
 *
 * ## Process
 *
 * - It figures it out. Regex is gonna be our friend here.
 * - Should we import these functions as well to make this thing mega-modular?
 *
 * ## Outputs
 *
 * - A return value.
 * @returns Either "area", "category", "id", or `false`.
 */

const acidDetector = (acidInput: string): ACIDDetectorReturn => {
	// Is it an area?
	if (isArea(acidInput)) return "area";

	// Is it a category?
	if (isCategory(acidInput)) return "category";

	// Is it an ID?
	if (isID(acidInput)) return "id";

	// Otherwise...
	return false;
};

export default acidDetector;
