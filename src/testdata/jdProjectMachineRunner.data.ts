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
 * a×c				// 23.22 A category does not belong to its parent area.
 * a,c,id×c   // 23.22 A category does not belong to its parent area.
 *
 * a,c×id     // 24.23 An ID does not belong to its parent category.
 *
 * a,id   		// 33.01 A category is missing between an area and an ID.
 *
 * a-a				// This class of error isn't possible here as the runner sorts
 * a,c-c      // the input and 'fixes' it for us. We prove that by testing for
 * a,c,id-id  // it.
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

// == Building blocks  ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
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

const id1101: UserbaseItem = {
	itemId: uuidv4(),
	item: {
		jdType: "id",
		jdNumber: "11.01",
		jdTitle: "ID 11.01",
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

// == Passing objects  ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==
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

/**
 * Items below pass because the machine runner sorts our input for us. A whole
 * subset of JD errors are redundant as a result.
 */

// Pass: JDE12.12 An area which immediately follows another area has an area
//       number lower than the preceding area.
export const passJDE1212: JDProject = {
	status: "tbc",
	data: [{ ...a2029 }, { ...a1019 }],
};

// Pass: JDE12.13 An area which follows a category has an area number lower
//       than the preceding area.
export const passJDE1213: JDProject = {
	status: "tbc",
	data: [{ ...a2029 }, { ...c20 }, { ...a1019 }],
};

// Pass: JDE12.14 An area which follows an ID has an area number lower than the
//       preceding area.
export const passJDE1214: JDProject = {
	status: "tbc",
	data: [{ ...a2029 }, { ...c20 }, { ...id2000 }, { ...a1019 }],
};

// Pass: JDE13.13 A category which immediately follows another category has a
//       category number lower than the preceding category.
export const passJDE1313: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c11 }, { ...c10 }],
};

// Pass: JDE13.14 A category which follows an ID has a category number lower
//       than the preceding category.
export const passJDE1314: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c11 }, { ...id1101 }, { ...c10 }],
};

// Pass: JDE14.14 An ID which follows an ID has an ID lower than
//       the preceding ID.
export const passJDE1414: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id1001 }, { ...id1000 }],
};

// == Failing objects  ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==

// JDE12.22: An area number was duplicated.
export const jde1222: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...a1019 }],
};

// JDE13.23: A category number was duplicated.
export const jde1323: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...c10 }],
};

// JDE14.24: An ID number was duplicated.
export const jde1424: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id1000 }, { ...id1000 }],
};

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
export const jde2423a: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id2000 }],
};
export const jde2423b: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...c10 }, { ...id1000 }, { ...id2000 }],
};

// JDE33.01 A category is missing between an area and an ID.
export const jde3301: JDProject = {
	status: "tbc",
	data: [{ ...a1019 }, { ...id1000 }],
};

// JDE42.01 An item whose jdType is 'area' is not an area.
export const jde4201: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: uuidv4(),
			item: {
				jdType: "area",
				jdNumber: "23",
				jdTitle: "23 is not an area",
			},
		},
	],
};

// JDE43.01 An item whose jdType is 'category' is not a category.
export const jde4301: JDProject = {
	status: "tbc",
	data: [
		{ ...a1019 },
		{
			itemId: uuidv4(),
			item: {
				jdType: "category",
				jdNumber: "20.00",
				jdTitle: "20.00 is not a category",
			},
		},
	],
};

// JDE44.01 An item whose jdType is 'id' is not an ID.
export const jde4401: JDProject = {
	status: "tbc",
	data: [
		{ ...a1019 },
		{ ...c10 },
		{
			itemId: uuidv4(),
			item: {
				jdType: "id",
				jdNumber: "23",
				jdTitle: "23 is not an ID",
			},
		},
	],
};

// == Ad-hoc tests  ==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==

export const fail09: JDProject = {
	status: "tbc",
	data: [
		{ ...a1019 },
		{ ...c10 },
		{
			itemId: uuidv4(),
			item: {
				jdType: "id",
				// @ts-expect-error
				jdNumber: "0.9",
				jdTitle: "0.9 is not an ID",
			},
		},
	],
};
