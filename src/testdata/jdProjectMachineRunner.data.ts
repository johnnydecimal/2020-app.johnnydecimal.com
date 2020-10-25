// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDProject from "../@types/JDProject";

// == Passing objects
export const passA: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "area",
				jdNumber: "10-19",
				jdTitle: "Area 10-19",
			},
		},
	],
};

export const passAC: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "area",
				jdNumber: "10-19",
				jdTitle: "Area 10-19",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "category",
				jdNumber: "11",
				jdTitle: "Category 11",
			},
		},
	],
};

export const passACID: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "area",
				jdNumber: "10-19",
				jdTitle: "Area 10-19",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "category",
				jdNumber: "11",
				jdTitle: "Category 11",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "id",
				jdNumber: "11.11",
				jdTitle: "ID 11.11",
			},
		},
	],
};

// == Failing objects
// Noooooo, you idiot. This can't fail -- the machine runner **sorts your input
// for you!**
export const fail1212: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "area",
				jdNumber: "20-29",
				jdTitle: "Area 20-29",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "area",
				jdNumber: "20-29",
				jdTitle: "Area 10-19",
			},
		},
	],
};

// JDE23.22: A category does not belong to its parent area.
export const fail2322: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "area",
				jdNumber: "00-09",
				jdTitle: "Area 00-09",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "category",
				jdNumber: "10",
				jdTitle: "Category 10",
			},
		},
	],
};

// JDE24.23: An ID does not belong to its parent category.
export const fail2423: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "category",
				jdNumber: "10",
				jdTitle: "Category 10",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "id",
				jdNumber: "20.00",
				jdTitle: "ID 20.00",
			},
		},
	],
};
