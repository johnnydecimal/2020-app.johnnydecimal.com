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
// JDE12.22: An area number was duplicated.
export const fail1222: JDProject = {
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
				jdType: "area",
				jdNumber: "00-09",
				jdTitle: "Area 00-09",
			},
		},
	],
};

// JDE13.23: A category number was duplicated.
export const fail1323: JDProject = {
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
				jdNumber: "10",
				jdTitle: "Category 00",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "category",
				jdNumber: "10",
				jdTitle: "Category 00",
			},
		},
	],
};

// JDE14.24: An ID number was duplicated.
export const fail1424: JDProject = {
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
				jdNumber: "10",
				jdTitle: "Category 00",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "id",
				jdNumber: "10.00",
				jdTitle: "ID 10.00",
			},
		},
		{
			itemId: "guid",
			item: {
				jdType: "id",
				jdNumber: "10.00",
				jdTitle: "ID 10.00",
			},
		},
	],
};

// JDE23.01: A category was detected as the first item in the database.
export const fail2301: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "category",
				jdNumber: "10",
				jdTitle: "Category 00",
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

// JDE24.01: An ID was detected as the first item in the database.
export const fail2401: JDProject = {
	status: "tbc",
	data: [
		{
			itemId: "guid",
			item: {
				jdType: "id",
				jdNumber: "10.00",
				jdTitle: "ID 10.00",
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
				jdType: "area",
				jdNumber: "10-19",
				jdTitle: "Area 10-19",
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
