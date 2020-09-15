import { UserbaseData, UserbaseItem } from "../types/Userbase";

/**
 * compareFunction is the function which we need to pass to Array.sort() in
 * order to perform a custom sort on our UserbaseItems.
 *
 * @param {UserbaseItem} first The first UserbaseItem to compare.
 * @param {UserbaseItem} second The second UserbaseItem to compare.
 * @returns {number} +1 or -1 as per the requirements for sorting.
 */
const compareFunction = (first: UserbaseItem, second: UserbaseItem): number => {
	// Convert the numbers to compare, which are currently strings, to numbers.
	// As a nice side-effect, '20-29' becomes '20' which is what we want.
	const firstNum: number = parseFloat(first.item.jdNumber);
	const secondNum: number = parseFloat(second.item.jdNumber);

	// There is only a special case to consider when the numbers are the same.
	// If they are *not* the same, this is a boring old sort.
	if (firstNum !== secondNum) {
		return firstNum - secondNum;
	} else {
		// If they're the same, we need to consider the case where we're comparing
		// the 20 from area 20-29 with category 20 with ID 20.00, all of which are
		// mathematically equal.
		switch (`${first.item.jdType} ${second.item.jdType}`) {
			case "area category":
				return -1;
			case "area id":
				return -1;
			case "category id":
				return -1;
			default:
				return +1;
		}
	}
};

/**
 * sortProjectArray takes a JDProject-shaped array and returns a new array
 * which is sorted in JD number order.
 *
 * The input array is not modified.
 *
 * @param {JDProject} jdProject The input array.
 * @returns {JDProject} The sorted array.
 */
const sortUserbaseData = (userbaseData: UserbaseData): UserbaseData => {
	// Array.sort() mutates the array. Make a copy.
	const returnArray = userbaseData;
	// debugger;

	returnArray.sort(compareFunction);

	return returnArray;
};

export default sortUserbaseData;
