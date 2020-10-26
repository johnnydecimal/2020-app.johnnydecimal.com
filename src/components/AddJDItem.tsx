// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { RouteComponentProps } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import insertJDItem from "../api/insertJDItem";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDNumber from "../@types/JDNumber";
import JDProject from "../@types/JDProject";

interface NewJDItem {
	jdNumber: JDNumber;
	jdTitle: string;
	jdType: "area" | "category" | "id";
}

interface Props extends RouteComponentProps {
	jdProject: JDProject;
}
/**
 * # AddJDItem
 *
 *     **THIS IS A TERRIBLE TEST COMPONENT**
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
 *
 * Update: that function is `insertJDItem`. The purpose of this component is to
 *         test that function.
 */
const AddJDItem: FunctionComponent<Props> = ({ jdProject }) => {
	const { register, handleSubmit } = useForm();

	const onSubmit = (formData: NewJDItem) => {
		console.debug("🥕 AddJDItem/onSubmit:");
		console.debug(formData);
		insertJDItem(formData, jdProject);
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
