// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import {
	Machine,
	DefaultContext,
	StateSchema,
	EventObject,
	assign,
} from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { UserbaseItem } from "../@types/Userbase";
export type DisplayDataContext = DefaultContext & {
	// setJdProject: Function;
	itemId: string;
	userbaseItem?: UserbaseItem;
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
	userbaseItem?: UserbaseItem;
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
						// @ts-ignore
						itemId: (context, event) => event.itemId,
						// @ts-ignore
						userbaseItem: (context, event) => event.userbaseItem,
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
