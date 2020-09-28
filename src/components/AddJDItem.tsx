import React from "react";
import { useForm } from "react-hook-form";
import userbase from "userbase-js";
import { RouteComponentProps } from "@reach/router";

import JDNumber from "../types/JDNumber";
import insertJDItem from "../jdCRUD/insertJDItem";
import JDProject from "../types/JDProject";

interface NewJDItem {
	jdNumber: JDNumber;
	jdTitle: string;
	jdType: "area" | "category" | "id";
}

const mockUserbaseInsertItem = (formData: NewJDItem, jdData: JDProject) => {
	// console.debug(jdNumber, jdTitle, jdType);
	// userbase.insertitem({
	// 	databasename: "test-2020-09-08-14-16",
	// 	item: {
	// 		jdnumber,
	// 		jdtitle,
	// 		jdtype,
	// 	},
	// });

	// insertJDItem needs a `:JDItem` as its first arg. That's `formData` in this
	// test.
	insertJDItem(formData, jdData);
};

interface Props {
	jdProject: JDProject;
}
/**
 * AddJDItem
 *
 * This component renders a form with two fields:
 * - Number: where we enter our new number.
 * - Title: where we enter our new title.
 *
 * And one radio selection:
 * - Area, category, ID.
 *
 * When submitted, the form needs to call a function which takes these values
 * and adds them to Userbase.
 */
const AddJDItem = ({ jdProject }: Props, props: RouteComponentProps) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (formData: NewJDItem) => {
		mockUserbaseInsertItem(formData, jdProject);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input name="jdNumber" ref={register} />
			<input name="jdTitle" ref={register} />
			<label>
				Area
				<input
					name="jdType"
					id="jdTypeArea"
					type="radio"
					value="area"
					ref={register}
				/>
			</label>
			<label>
				Category
				<input
					name="jdType"
					id="jdTypeCategory"
					type="radio"
					value="category"
					ref={register}
				/>
			</label>
			<label>
				ID
				<input
					name="jdType"
					id="jdTypeID"
					type="radio"
					value="id"
					ref={register}
				/>
			</label>
			<input type="submit" />
		</form>
	);
};

export default AddJDItem;
