// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Machine, DefaultContext, StateSchema, EventObject } from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
export type DisplayDataContext = DefaultContext & {
	// setJdProject: Function;
};

export interface DisplayDataSchema extends StateSchema {
	states: {
		displayingList: {};
		displayingItem: {};
	};
}

export interface DisplayDataEvent extends EventObject {
	type: "CLICK_ITEM" | "RETURN_TO_LIST";
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const displayDataMachine = Machine<
	DisplayDataContext,
	DisplayDataSchema,
	DisplayDataEvent
>({
	strict: true,

	id: "displayData",
	initial: "displayingList",

	states: {
		displayingList: {
			on: {
				CLICK_ITEM: "displayingItem",
			},
		},
		displayingItem: {
			on: {
				RETURN_TO_LIST: "displayingList",
			},
		},
	},
});

export default displayDataMachine;
