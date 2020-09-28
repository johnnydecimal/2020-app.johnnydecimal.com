// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import acidDetector from "../jdACIDhelpers/acidDetector";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDItem from "../types/JDItem";
import JDProject from "../types/JDProject";

/**
 * # insertJDItem
 *
 * Make this an API-like function that is the one function called from anywhere
 * and it is the only way to add an item to the database.
 *
 * It needs to handle all of the checking to make sure that the new item is
 * valid, and updates both local and remote state to ensure smooth user
 * experience (because local state is updated immediately) and consistency of
 * the database (because its updated state is compared to local state).
 *
 * ## Design decision
 *
 * I was tossing up what type of input this thing should receive. Should it
 * accept a simple string (`12.01 New ID`)? Should it accept a `:JDItem`-like
 * object, complete with all properties? Or a similar item without the `jdType`
 * property (that was a weird thought).
 *
 * The answer is that it needs to be given a complete `:JDItem`-like object.
 * That is what you're going to need to give Userbase, so that's what this
 * function needs. If you need to construct that object elsewhere from the
 * user's actual input, do that elsewhere.
 *
 * Remember, though, that an object which matches the *shape* of `JDItem` might
 * not necessarily be a valid new JD item. The thing might already exist in the
 * database, or its parent object might not exist, or whatever. So we do all
 * those checks here.
 *
 * ## Version history and roadmap
 * - 2020-10: We only support simple items of the format `Number Title`. None of
 *   the fancy meta stuff is supported in this version, in the spirit of walking
 *   before one can run.
 * - Future: Bring in the extra meta stuff like notes.
 *
 * ## Inputs
 *
 * 1. The state-updating function (a React hook).
 * @param {function} setJdData
 * 2. The current database, to allow us to validate the new entry.
 * @param {array} jdData
 * 3. Some logic functions which allow us to check that the thing we're trying
 *    to add is valid (e.g. '00 Test' is not an ID).
 * 4. The actual Userbase methods to allow us to push the data up there.
 * 5. The JD parser to validate that our new data is a valid JD Project.
 * 6. The thing to add! Haha, forgot the most important thing.
 * @param {object} newJDItem - With type `JDItem`.
 *
 * ## New item input format
 *
 * Let's say that this function needs to be given a fully-formed `JDItem`. How
 * you construct that from the specific user-facing input field is none of this
 * function's concern.
 *
 * ## Process
 *
 * - Check that the thing we're adding is at least a valid JD thing.
 *   - Update: we're forcing that by only accepting `:JDItem` as input.
 * - Simulate adding it to the current database. Is the resulting database a
 *   valid JD Project?
 *   - If not, return an error.
 *   - Maybe do a quick 'n dirty check first, i.e. is it a duplicate? Before
 *     it goes through the full machine? Just to speed things up.
 * - Create a copy of local state, add the new item to it, sort the object, and
 *   make it the current local state. This is the 'get it on-screen asap' part.
 * - Push the item to Userbase. The changeHandler will then run, and the remote
 *   database will be fetched. We will need to do some work there to ensure it
 *   reconciles nicely with our current local state, but that it outside of the
 *   scope of this function.
 *
 * ## Outputs
 *
 * - ? An error, if the input was invalid (e.g. it was a duplicate ID).
 * - Local state will be updated.
 * - A call will be made to userbase.insertItem().
 */

const insertJDItem = (newJDItem: JDItem, jdData: JDProject) => {
	// TODO: Remember to approach this like Gordon!

	console.debug("🧪 insertJDItem, newJDItem and jdData:", newJDItem, jdData);
	// Quick check: does the item already exist? Yeah and just get this function
	// started, prove that it's plumbed in right.
	jdData.data.forEach((jdItem) => {
		if (newJDItem.jdNumber === jdItem.item.jdNumber) {
			throw new Error("🚨 insertJDItem.ts: the new item already exists.");
		}
	});
};

export default insertJDItem;
