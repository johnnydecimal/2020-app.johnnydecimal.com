// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Machine, DefaultContext, StateSchema, EventObject } from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
type DisplayDataContext = DefaultContext & {
	// setJdProject: Function;
};

interface DisplayDataSchema extends StateSchema {
	states: {
		displayingList: {};
		displayingItem: {};
	};
}

interface DisplayDataEvent extends EventObject {
	type: "CLICK_ITEM" | "RETURN_TO_LIST";
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const displayDataStateMachine = Machine<
	DisplayDataContext,
	DisplayDataSchema,
	DisplayDataEvent
>({
	strict: true,

	id: "displayDataState",
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

export default displayDataStateMachine;
