// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Machine, assign, EventObject } from "xstate";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import isCategoryInArea from "../jdACIDhelpers/isCategoryInArea";
import isIDInCategory from "../jdACIDhelpers/isIDInCategory";
import { isArea, isCategory, isID } from "../jdACIDhelpers/isACID";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDNumber from "../@types/JDNumber";
import JDArea from "../@types/JDArea";
import JDCategory from "../@types/JDCategory";
import JDID from "../@types/JDID";

interface JDProjectContext {
	area: JDArea;
	category: JDCategory;
	id: JDID;
	error: string;
}

interface JDProjectSchema {
	states: {
		start: {};
		area_detected: {};
		category_detected: {};
		id_detected: {};
		eof: {};
		error: {};
	};
}

type JDEvent = "AREA" | "CATEGORY" | "ID" | "EOF" | "ERROR";
interface JDProjectEvent extends EventObject {
	type: JDEvent;
	jdNumber: JDNumber;
}

// Context-assigning functions
const updateAreaContext = assign({
	area: (context, event: JDProjectEvent) => event.jdNumber,
});
const updateCategoryContext = assign({
	category: (context, event: JDProjectEvent) => event.jdNumber,
});
const updateIDContext = assign({
	id: (context, event: JDProjectEvent) => event.jdNumber,
});

// Error-assigning functions
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
 *
 * Actually that's a terrible example. It's the machine definition which ensures
 * that a transition of ID from a state of `area` results in a state of `error`.
 *
 * The guards do other valuable things that the machine can't pick up, such as
 * checking that the current area number isn't the same as the existing area
 * number.
 */

/**
 * # guardArea
 *
 * guardArea is executed when *any* `AREA` transition is sent.
 *
 * Let's think about this a bit more. You added the emphasis to *any* there
 * because this didn't used to be the case, e.g. on `start.AREA`.
 *
 * The purpose of the guard is simple:
 * - Return `false` and set `context.error` if there was an error.
 * - Return `true` otherwise.
 *
 * @param {Object} context
 * @param {Object} event
 * @param {Object} guardMeta Contains the *previous* state on `.state`
 */
const guardArea = (context: JDProjectContext, event: JDProjectEvent) => {
	const current = context; // Hep my brain

	// Is the area actually an area?
	if (!isArea(event.jdNumber)) {
		context.error = "JDE42.01";
		return false;
	}

	// If the number sent is the same as the current area, it's a duplicate
	if (event.jdNumber === current.area) {
		context.error = "JDE12.22";
		return false;
	}

	// Note: we had tests here for 'is the area order valid?', but in the current
	//       implementation we sort the input before sending it to the machine.
	return true;
};

/**
 * # guardCategory
 *
 * guardCategory is executed when any 'CATEGORY' transition is sent.
 *
 * See notes on `guardArea` above.
 *
 * @param {Object} context
 * @param {Object} event
 * @param {Object} guardMeta
 */
const guardCategory = (context: JDProjectContext, event: JDProjectEvent) => {
	const current = context; // Hep my brain

	// Is the category actually a category?
	if (!isCategory(event.jdNumber)) {
		context.error = "JDE43.01";
		return false;
	}

	// If the number sent is the same as the current category, it's a duplicate
	if (event.jdNumber === current.category) {
		context.error = "JDE13.23";
		return false;
	}

	// Does the category belong to its parent area?
	if (!isCategoryInArea(current.area, event.jdNumber as JDCategory)) {
		context.error = "JDE23.22";
		return false;
	}

	// Note: we had tests here for 'is the category order valid?', but the current
	//       implementation sorts the input before sending it to the machine.
	return true;
};

/**
 * # guardID
 *
 * guardID is executed when any 'ID' transition is sent.
 *
 * See notes on `guardArea` above.
 *
 * @param {Object} context
 * @param {Object} event
 * @param {Object} guardMeta
 */
const guardID = (context: JDProjectContext, event: JDProjectEvent) => {
	const current = context; // Hep my brain

	// Is the ID actually an ID?
	if (!isID(event.jdNumber)) {
		context.error = "JDE44.01";
		return false;
	}

	// If the number sent is the same as the current ID, it's a duplicate
	if (event.jdNumber === current.id) {
		context.error = "JDE14.24";
		return false;
	}

	// Does the ID belong to its parent category?
	if (!isIDInCategory(current.category, event.jdNumber as JDID)) {
		context.error = "JDE24.23";
		return false;
	}

	// Note: we had tests here for 'is the ID order valid?', but in the current
	//       implementation we sort the input before sending it to the machine.
	return true;
};

const jdProjectMachine = Machine<
	JDProjectContext,
	JDProjectSchema,
	JDProjectEvent
>(
	{
		id: "jdLanguage",
		initial: "start",
		strict: true,
		context: {
			// @ts-expect-error
			area: "",
			// @ts-expect-error
			category: "",
			// @ts-expect-error
			id: "",
			error: "",
		},
		states: {
			start: {
				on: {
					AREA: [
						{
							target: "area_detected",
							actions: "updateAreaContext",
							cond: "guardArea",
						},
						{
							target: "error",
						},
					],
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
					// TODO: Improve this? Currently this will fail as JDE33.01 when you
					//       send anything that *claims to be* an ID, regardless of what
					//       it is. Your preference is to prioritise reporting of the
					//       dodgy input.
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
