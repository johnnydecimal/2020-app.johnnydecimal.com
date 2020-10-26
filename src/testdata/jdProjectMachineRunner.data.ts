// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { v4 as uuidv4 } from "uuid";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDProject from "../@types/JDProject";
import { UserbaseItem } from "../@types/Userbase";

/**
 * What are the possible paths through the machine?
 *
 * ## Passing paths, all possibilities
 * a
 * a,c
 * a,c,id
 * a,c,id+id
 * a,c+c,id
 * a+a,c,id
 *
 * ## Failing paths, all possibilities
 * c					// 23.01 A category was detected as the first item in the database.
 * id					// 24.01 An ID was detected as the first item in the database.
 *
 * a,id   		// 33.01 A category is missing between an area and an ID.
 *
 * a×c				// Incorrect ownership (`×` = doesn't belong)
 * a,c×id
 * a,c,id×c
 *
 * a-a				// Out-of-order (`-` = below)
 * a,c-c
 * a,c,id-id
 *
 * a!a        // Duplicate values (`!` = 'the same')
 * a,c!c
 * a,c,id!id
 *
 * ~					// Nonsense input
 * a,~
 * a,c,~
 * a,c,id,~
 */

const a1019: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "area",
		jdNumber: "10-19",
		jdTitle: "Area 10-19",
	},
};

const c10: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "category",
		jdNumber: "10",
		jdTitle: "Category 10",
	},
};

const c11: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "category",
		jdNumber: "11",
		jdTitle: "Category 11",
	},
};

const id1000: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "id",
		jdNumber: "10.00",
		jdTitle: "ID 10.00",
	},
};

const id1001: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "id",
		jdNumber: "10.01",
		jdTitle: "ID 10.01",
	},
};

const a2029: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "area",
		jdNumber: "20-29",
		jdTitle: "Area 20-29",
	},
};

const c20: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "category",
		jdNumber: "20",
		jdTitle: "Category 20",
	},
};

const id2000: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "id",
		jdNumber: "20.00",
		jdTitle: "ID 20.00",
	},
};

// == Passing objects
export const passA: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }],
};

export const passAC: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }],
};

export const passACID: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id1000 }],
};

export const passACIDID: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id1000 }, { ...id1001 }],
};

export const passACCID: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...c11 }, { ...id1000 }],
};

export const passAACID: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...a2029 }, { ...c20 }, { ...id2000 }],
};

// == Failing objects
// JDE23.01 A category was detected as the first item in the database.
export const jde2301: JDProject = {
	status: "tbc",
	data: [{ ...c10 }],
};

// JDE24.01 An ID was detected as the first item in the database.
export const jde2401: JDProject = {
	status: "tbc",
	data: [{ ...id1000 }],
};

// JDE33.01 A category is missing between an area and an ID.
export const jde3301: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...id1000 }],
};

// JDE23.22: A category does not belong to its parent area.
export const jde2322a: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c20 }],
};
export const jde2322b: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id1000 }, { ...c20 }],
};

// JDE24.23: An ID does not belong to its parent category.
export const jde2423: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id2000 }],
};

// // JDE12.22: An area number was duplicated.
// export const fail1222: JDProject = {
// 	status: "tbc",
// 	data: [
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "area",
// 				jdNumber: "00-09",
// 				jdTitle: "Area 00-09",
// 			},
// 		},
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "area",
// 				jdNumber: "00-09",
// 				jdTitle: "Area 00-09",
// 			},
// 		},
// 	],
// };

// // JDE13.23: A category number was duplicated.
// export const fail1323: JDProject = {
// 	status: "tbc",
// 	data: [
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "area",
// 				jdNumber: "10-19",
// 				jdTitle: "Area 10-19",
// 			},
// 		},
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "category",
// 				jdNumber: "10",
// 				jdTitle: "Category 00",
// 			},
// 		},
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "category",
// 				jdNumber: "10",
// 				jdTitle: "Category 00",
// 			},
// 		},
// 	],
// };

// // JDE14.24: An ID number was duplicated.
// export const fail1424: JDProject = {
// 	status: "tbc",
// 	data: [
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "area",
// 				jdNumber: "10-19",
// 				jdTitle: "Area 10-19",
// 			},
// 		},
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "category",
// 				jdNumber: "10",
// 				jdTitle: "Category 00",
// 			},
// 		},
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "id",
// 				jdNumber: "10.00",
// 				jdTitle: "ID 10.00",
// 			},
// 		},
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "id",
// 				jdNumber: "10.00",
// 				jdTitle: "ID 10.00",
// 			},
// 		},
// 	],
// };

// // JDE23.01: A category was detected as the first item in the database.
// export const fail2301: JDProject = {
// 	status: "tbc",
// 	data: [
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "category",
// 				jdNumber: "10",
// 				jdTitle: "Category 00",
// 			},
// 		},
// 	],
// };

// // JDE24.01: An ID was detected as the first item in the database.
// export const fail2401: JDProject = {
// 	status: "tbc",
// 	data: [
// 		{
// 			itemId: "guid",
// 			item: {
// 				jdType: "id",
// 				jdNumber: "10.00",
// 				jdTitle: "ID 10.00",
// 			},
// 		},
// 	],
// };
