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

// -- Guards -----------------------------------------------------------------
/**
 * guardArea is executed when any 'AREA' transition is sent.
 * @param {object} context
 * @param {object} event
 * @param {object} guardMeta
 */
const guardArea = (context, event, guardMeta) => {
	if (isAreaOrderValid(context.area, event.jdNumber)) {
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
 * @param {object} context
 * @param {object} event
 * @param {object} guardMeta
 */
const guardCategory = (context, event, guardMeta) => {
	if (
		isCategoryOrderValid(context.category, event.jdNumber) &&
		isCategoryInArea(context.area, event.jdNumber)
	) {
		return true;
	} else {
		switch (guardMeta.state.value) {
			// JDE13.13: Category follows category.
			case "category_detected":
				context.error = "JDE13.13";
				return false;
			// JDE13.14: Category follows ID.
			case "id_detected":
				context.error = "JDE13.14";
				return false;
			// JDE23.22: Category does not belong to area.
			case "area_detected":
				context.error = "JDE23.22";
				return false;
			default:
				context.error = "JDE01.13";
				return false;
		}
	}
};

/**
 * guardID is executed when any 'ID' transition is sent.
 * @param {object} context
 * @param {object} event
 * @param {object} guardMeta
 */
const guardID = (context, event, guardMeta) => {
	if (
		isIDInCategory(context.category, event.jdNumber) &&
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

const jdMachine = Machine(
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
					CATEGORY: "error",
					ID: "error",
					COMMENT: "start",
					DIVIDER: "start",
					EMPTYLINE: "start",
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
					ID: "error",
					COMMENT: "area_detected",
					DIVIDER: "area_detected",
					EMPTYLINE: "area_detected",
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
							cond: "idValid",
						},
						{ target: "error" },
					],
					COMMENT: "category_detected",
					DIVIDER: "category_detected",
					EMPTYLINE: "category_detected",
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
							cond: "idValid",
						},
						{ target: "error" },
					],
					COMMENT: "id_detected",
					DIVIDER: "id_detected",
					EMPTYLINE: "id_detected",
					EOF: "eof",
					ERROR: "error",
				},
			},

			eof: {
				type: "final",
			},

			error: {
				type: "final",
				entry: (context, event) => {
					if (event.error === "Nothing matched.") {
						context.error = "JDE41.11";
					}
				},
			},
		},
	},
	{
		actions: { updateAreaContext, updateCategoryContext, updateIDContext },
		guards: {
			guardArea,
			guardCategory,
			idValid: guardID,
		},
	}
);

export default jdMachine;

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
