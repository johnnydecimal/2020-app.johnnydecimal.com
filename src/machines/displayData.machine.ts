// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { Machine, assign, StateSchema, EventObject } from "xstate";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { UserbaseItem } from "../@types/Userbase";

export type DisplayDataContext = {
	itemId?: string;
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

	states: {
		displayingList: {
			on: {
				CLICK_ITEM: {
					target: "displayingItem",
					actions: assign({
						// @ts-ignore
						itemId: (_context, event) => event.itemId,
						// @ts-ignore
						userbaseItem: (_context, event) => event.userbaseItem,
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
