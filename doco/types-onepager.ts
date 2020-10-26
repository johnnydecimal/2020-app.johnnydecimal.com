// @ts-nocheck
/**
 * All of your types on one page for quick reference.
 *
 * Careful you don't forget to update them. These aren't acually in use.
 */

interface JDProject {
	status: "valid" | "error";
	data: UserbaseData; // Required, but can of course be empty.
	error?: string;
	errorLine?: Number;
}

type UserbaseData = UserbaseItem[];

interface UserbaseItem {
	item: JDItem;
	itemId: string;
}

interface JDItem {
	jdType: "area" | "category" | "id";
	jdNumber: JDArea | JDCategory | JDID;
	jdTitle: string;
}
