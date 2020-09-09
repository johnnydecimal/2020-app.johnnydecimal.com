import JDArea from '../types/JDArea';

/**
 * isAreaOrderValid returns true if the second area sequentially follows the
 * first area. e.g. '20-29' follows '10-19' (=> true) but '40-49' does not
 * follow '50-59' (=> false).
 *
 * @param {string} first The first area to check.
 * @param {string} second The second area to check.
 * @returns {boolean} `true` if they are sequential, `false` otherwise.
 */
// TODO Better type/error checking. If you manage to pass this a non-area,
//      it'll return true regardless.
const isAreaOrderValid = (first: JDArea, second: JDArea): boolean => {
	return Number(second.charAt(0)) > Number(first.charAt(0));
};

export default isAreaOrderValid;
