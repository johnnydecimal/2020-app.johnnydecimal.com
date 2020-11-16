// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import {
	Machine,
	DefaultContext,
	StateSchema,
	EventObject,
	assign,
} from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
export type DisplayDataContext = DefaultContext & {
	// setJdProject: Function;
	itemId: string;
};

export interface DisplayDataSchema extends StateSchema {
	states: {
		displayingList: {};
		displayingItem: {};
	};
}

export interface DisplayDataEvent extends EventObject {
	type: "CLICK_ITEM" | "RETURN_TO_LIST";
	itemId?: string;
	otherValue?: string;
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

	context: {
		itemId: "",
	},

	states: {
		displayingList: {
			on: {
				CLICK_ITEM: {
					target: "displayingItem",
					actions: assign({
						itemId: (context, event) => event.itemId,
					}),
				},
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
