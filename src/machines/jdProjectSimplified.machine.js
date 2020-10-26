import { Machine } from "xstate";

const jdProjectMachineSimplified = Machine({
	id: "jdLanguage",
	initial: "start",
	strict: true,
	context: {
		area: "",
		category: "",
		id: "",
		error: "",
	},
	states: {
		start: {
			on: {
				AREA: {
					target: "area_detected",
				},
				CATEGORY: {
					target: "error",
				},
				ID: {
					target: "error",
				},
				// COMMENT: "start",
				// DIVIDER: "start",
				// EMPTYLINE: "start",
				EOF: "eof",
				ERROR: "error",
			},
		},

		area_detected: {
			on: {
				AREA: [
					{
						target: "area_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				CATEGORY: [
					{
						target: "category_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				ID: "error",
				// COMMENT: "area_detected",
				// DIVIDER: "area_detected",
				// EMPTYLINE: "area_detected",
				EOF: "eof",
				ERROR: "error",
			},
		},

		category_detected: {
			on: {
				AREA: [
					{
						target: "area_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				CATEGORY: [
					{
						target: "category_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				ID: [
					{
						target: "id_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				// COMMENT: "category_detected",
				// DIVIDER: "category_detected",
				// EMPTYLINE: "category_detected",
				EOF: "eof",
				ERROR: "error",
			},
		},

		id_detected: {
			on: {
				AREA: [
					{
						target: "area_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				CATEGORY: [
					{
						target: "category_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				ID: [
					{
						target: "id_detected",
						cond: () => true,
					},
					{ target: "error" },
				],
				// COMMENT: "id_detected",
				// DIVIDER: "id_detected",
				// EMPTYLINE: "id_detected",
				EOF: "eof",
				ERROR: "error",
			},
		},

		eof: {
			type: "final",
		},

		error: {
			type: "final",
			// entry: (context, event) => {
			// 	if (event.error === "Nothing matched.") {
			// 		context.error = "JDE41.11";
			// 	}
			// },
		},
	},
});

export default jdProjectMachineSimplified;
