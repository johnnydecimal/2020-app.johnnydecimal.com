import JDItem from "./JDItem";

type UserbaseItem = {
	item: JDItem;
	itemId: string;
};

/**
 * The `UserbaseData` array is an array of `UserbaseItem`s as returned by
 * `userbase.openDatabase()`.
 */
type UserbaseData = UserbaseItem[];

export type { UserbaseItem, UserbaseData };
