import { Machine, assign } from "xstate";

import isAreaOrderValid from "../jdACIDhelpers/isAreaOrderValid";
import isCategoryOrderValid from "../jdACIDhelpers/isCategoryOrderValid";
import isIDOrderValid from "../jdACIDhelpers/isIDOrderValid";
import isCategoryInArea from "../jdACIDhelpers/isCategoryInArea";
import isIDInCategory from "../jdACIDhelpers/isIDInCategory";

// Context
const updateAreaContext = assign({
	area: (context, event) => event.jdNumber,
});
const updateCategoryContext = assign({
	category: (context, event) => event.jdNumber,
});
const updateIDContext = assign({
	id: (context, event) => event.jdNumber,
});

// Errors
const errorJDE2301 = assign({
	error: "JDE23.01",
});
const errorJDE2401 = assign({
	error: "JDE24.01",
});
const errorJDE3301 = assign({
	error: "JDE33.01",
});

/**
 * The guards are the functions that ensure that our project parses properly.
 * For example, you can't directly follow an area with an ID. The guard ensures
 * that this is the case.
 */

/**
 * guardArea is executed when any 'AREA' transition is sent.
 * @param {Object} context
 * @param {Object} event
 * @param {Object} guardMeta
 */
const guardArea = (context, event, guardMeta) => {
	if (context.area === event.jdNumber) {
		// If the numbers are the same, we have a duplicate-value error
		context.error = "JDE12.22";
		return false;
	} else if (isAreaOrderValid(context.area, event.jdNumber)) {
		// Otherwise test for order validity; note that this is impossible to fail
		// in the current Userbase implementation as `jdProjectMachineRunner()`
		// sorts the input object before sending it to the machine.
		return true;
	} else {
		switch (guardMeta.state.value) {
			case "area_detected":
				context.error = "JDE12.12";
				return false;
			case "category_detected":
				context.error = "JDE12.13";
				return false;
			case "id_detected":
				context.error = "JDE12.14";
				return false;
			default:
				context.error = "JDE01.12";
				return false;
		}
	}
};

/**
 * guardCategory is executed when any 'CATEGORY' transition is sent.
 * @param {Object} context
 * @param {Object} event
 * @param {Object} guardMeta
 */
const guardCategory = (context, event, guardMeta) => {
	const prevState = guardMeta.state;
	const current = context; // Hep my brain

	if (current.category === event.jdNumber) {
		context.error = "JDE13.23";
		return false;
	} else if (!isCategoryInArea(current.area, event.jdNumber)) {
		context.error = "JDE23.22";
		return false;
	} else if (
		// Otherwise test for order validity; note that this is impossible to fail
		// in the current Userbase implementation as `jdProjectMachineRunner()`
		// sorts the input object before sending it to the machine.
		isCategoryOrderValid(context.category, event.jdNumber)
	) {
		return true;
	} else {
		switch (prevState.value) {
			// JDE13.13: Category follows category.
			case "category_detected":
				context.error = "JDE13.13";
				return false;
			// JDE13.14: Category follows ID.
			case "id_detected":
				context.error = "JDE13.14";
				return false;
			default:
				context.error = "JDE01.13";
				return false;
		}
	}
};

/**
 * guardID is executed when any 'ID' transition is sent.
 * @param {Object} context
 * @param {Object} event
 * @param {Object} guardMeta
 */
const guardID = (context, event, guardMeta) => {
	if (context.id === event.jdNumber) {
		// If the numbers are the same, we have a duplicate-value error
		context.error = "JDE14.24";
		return false;
	} else if (
		// Otherwise test for order validity; note that this is impossible to fail
		// in the current Userbase implementation as `jdProjectMachineRunner()`
		// sorts the input object before sending it to the machine.
		isIDInCategory(context.category, event.jdNumber) &&
		// This is a valid test, however.
		isIDOrderValid(context.id, event.jdNumber)
	) {
		return true;
	} else {
		switch (guardMeta.state.value) {
			case "id_detected":
				context.error = "JDE14.14";
				return false;
			case "category_detected":
				context.error = "JDE24.23";
				return false;
			default:
				context.error = "JDE01.14";
				return false;
		}
	}
};

const jdProjectMachine = Machine(
	{
		id: "jdLanguage",
		initial: "start",
		strict: true,
		context: {
			area: "",
			category: "",
			id: "",
			error: "",
		},
		states: {
			start: {
				on: {
					AREA: {
						target: "area_detected",
						actions: "updateAreaContext",
					},
					CATEGORY: {
						target: "error",
						actions: "errorJDE2301",
					},
					ID: {
						target: "error",
						actions: "errorJDE2401",
					},
					// COMMENT: "start",
					// DIVIDER: "start",
					// EMPTYLINE: "start",
					EOF: "eof",
					ERROR: "error",
				},
			},

			area_detected: {
				on: {
					AREA: [
						{
							target: "area_detected",
							actions: "updateAreaContext",
							cond: "guardArea",
						},
						{ target: "error" },
					],
					CATEGORY: [
						{
							target: "category_detected",
							actions: "updateCategoryContext",
							cond: "guardCategory",
						},
						{ target: "error" },
					],
					ID: {
						target: "error",
						actions: "errorJDE3301",
					},
					// COMMENT: "area_detected",
					// DIVIDER: "area_detected",
					// EMPTYLINE: "area_detected",
					EOF: "eof",
					ERROR: "error",
				},
			},

			category_detected: {
				on: {
					AREA: [
						{
							target: "area_detected",
							actions: "updateAreaContext",
							cond: "guardArea",
						},
						{ target: "error" },
					],
					CATEGORY: [
						{
							target: "category_detected",
							actions: "updateCategoryContext",
							cond: "guardCategory",
						},
						{ target: "error" },
					],
					ID: [
						{
							target: "id_detected",
							actions: "updateIDContext",
							cond: "guardID",
						},
						{ target: "error" },
					],
					// COMMENT: "category_detected",
					// DIVIDER: "category_detected",
					// EMPTYLINE: "category_detected",
					EOF: "eof",
					ERROR: "error",
				},
			},

			id_detected: {
				on: {
					AREA: [
						{
							target: "area_detected",
							actions: "updateAreaContext",
							cond: "guardArea",
						},
						{ target: "error" },
					],
					CATEGORY: [
						{
							target: "category_detected",
							actions: "updateCategoryContext",
							cond: "guardCategory",
						},
						{ target: "error" },
					],
					ID: [
						{
							target: "id_detected",
							actions: "updateIDContext",
							cond: "guardID",
						},
						{ target: "error" },
					],
					// COMMENT: "id_detected",
					// DIVIDER: "id_detected",
					// EMPTYLINE: "id_detected",
					EOF: "eof",
					ERROR: "error",
				},
			},

			eof: {
				type: "final",
			},

			error: {
				type: "final",
				// entry: (context, event) => {
				// 	if (event.error === "Nothing matched.") {
				// 		context.error = "JDE41.11";
				// 	}
				// },
			},
		},
	},
	{
		actions: {
			updateAreaContext,
			updateCategoryContext,
			updateIDContext,
			errorJDE2301,
			errorJDE2401,
			errorJDE3301,
		},
		guards: {
			guardArea,
			guardCategory,
			guardID,
		},
	}
);

export default jdProjectMachine;

/* TypeScript stuff. Save this for later.
interface JDStateSchema {
  states: {
    start: {};
    area_detected: {};
    category_detected: {};
    id_detected: {};
    eof: {};
    error: {};
  };
}

type ContextObject = {
  area: string;
  category: string;
  id: string;
};

type JDEvent =
  | { type: 'AREA'; actions: 'updateAreaContext' }
  | { type: 'CATEGORY' }
  | { type: 'ID' }
  | { type: 'ERROR' }
  | { type: 'COMMENT' }
  | { type: 'DIVIDER' }
  | { type: 'EMPTYLINE' }
  | { type: 'EOF' };

*/
