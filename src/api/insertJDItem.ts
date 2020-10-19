// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { interpret } from "xstate";
import userbase from "userbase-js";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import jdMachine from "../machines/jdParser";
import { isArea, isCategory, isID } from "../jdACIDhelpers/isACID";
import sortUserbaseData from "../userbase/sortUserbaseData";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDItem from "../@types/JDItem";
import JDProject from "../@types/JDProject";
import { UserbaseData } from "../@types/Userbase";

/**
 * # sanityCheck
 *
 * Checks that the item looks like the type you've said it is.
 *
 * @param newJDItem - The JD Item to sanity check
 * @returns Nothing, but throws an `Error` if something's wrong.
 */
const sanityCheck = (newJDItem: JDItem) => {
	switch (newJDItem.jdType) {
		case "area":
			if (!isArea(newJDItem.jdNumber)) {
				return new Error(
					`🚨 insertJDItem: you've given me something claiming to be an area, but its jdNumber is ${newJDItem.jdNumber}.`
				);
			}
			break;
		case "category":
			if (!isCategory(newJDItem.jdNumber)) {
				return new Error(
					`🚨 insertJDItem: you've given me something claiming to be a category, but its jdNumber is ${newJDItem.jdNumber}.`
				);
			}
			break;
		case "id":
			if (!isID(newJDItem.jdNumber)) {
				return new Error(
					`🚨 insertJDItem: you've given me something claiming to be an ID, but its jdNumber is ${newJDItem.jdNumber}.`
				);
			}
			break;
		default:
			return new Error(
				`🚨 insertJDItem: you've given me something whose jdType is ${newJDItem.jdType}. This is deeply confusing.`
			);
	}
};

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
 * 1. The local-state-updating function (a React hook).
 * @param {function} setJdData
 * 2. The current project, to allow us to validate the new entry.
 * @param {array} jdProject
 * 3. Some logic functions which allow us to check that the thing we're trying
 *    to add is valid (e.g. '00 Test' is not an ID). (We implemented that here
 *    as `sanityCheck()`.)
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
 *   - Update: we're forcing that by only accepting `:JDItem` as input,
 *             but we're still going to check.
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
 * We need to return an object which has details about what happened. This can't
 * be an `Error`, we need to fail gracefully.
 *
 * - ? An error, if the input was invalid (e.g. it was a duplicate ID).
 * - Local state will be updated.
 * - A call will be made to userbase.insertItem().
 */

const insertJDItem = (newJDItem: JDItem, jdProject: JDProject) => {
	// TODO: Remember to approach this like Gordon!
	// TODO: Save to localStorage as well

	// Sanity check: does the input look right?
	sanityCheck(newJDItem);

	// Make a copy of our current project that we can mutate
	let jdProjectDataWithNewItem: UserbaseData = [
		...jdProject.data,
		{ itemId: "userbase will fill me in", item: newJDItem },
	];
	jdProjectDataWithNewItem = sortUserbaseData(jdProjectDataWithNewItem);
	// console.debug(jdProjectDataWithNewItem);

	/**
	 * We need to extract "is this a valid project?" out to a self-contained
	 * function. It's needed over in userbaseState.machine/changeHandler().
	 *
	 *
	 */
	// Start the machine
	const jdMachineService = interpret(jdMachine).start();

	// Run jdProjectDataWithNewItem through the machine
	for (let i = 0; i < jdProjectDataWithNewItem.length; i++) {
		const jdType = jdProjectDataWithNewItem[i].item.jdType.toUpperCase();
		jdMachineService.send({
			type: jdType,
			...jdProjectDataWithNewItem[i].item,
		});

		console.debug("👾 insertJDItem: in the machine");
		console.debug(jdProjectDataWithNewItem[i].item);
		console.debug(jdMachineService.state.value);

		// If we're in an error state, break
		if (jdMachineService.state.matches("error")) {
			// @ts-expect-error - Doesn't like .error, but we know it exists
			// TODO: fix this in the machine's context definition.
			return jdMachineService.state.context.error;
		}
	}

	// We're good to go. Push the new item to Userbase.
	userbase.insertItem({
		databaseName: "test-2020-09-08-14-16",
		item: newJDItem,
	});

	// == Return value: `true` if nothing went wrong.  ==-==-==-==-==-==-==-==-==
	return true;
};

export default insertJDItem;
