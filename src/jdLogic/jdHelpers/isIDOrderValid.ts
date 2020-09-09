import JDID from '../jdTypes/JDID';

/**
 * isIDOrderValid returns true if the second ID sequentially follows the
 * first ID. e.g. '43.93' follows '18.05' (=> true) but '00.00' does not
 * follow '00.04' (=> false).
 *
 * @param {string} first The first id to check.
 * @param {string} second The second id to check.
 * @returns {boolean} `true` if they are sequential, `false` otherwise.
 */
// TODO Better type/error checking. If you manage to pass this a non-id,
//      it'll return true regardless.
const isIDOrderValid = (first: JDID, second: JDID): boolean => {
  return Number(second) > Number(first);
};

export default isIDOrderValid;
