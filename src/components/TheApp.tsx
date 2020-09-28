// External
import React, { FunctionComponent } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import userbase from "userbase-js";
import { RouteComponentProps } from "@reach/router";

import AddJDItem from "./AddJDItem";
import insertJDItem from "../jdCRUD/insertJDItem";

import JDItem from "../types/JDItem";
import { UserbaseItem } from "../types/Userbase";
import JDProject from "../types/JDProject";

interface Props extends RouteComponentProps {
	jdProject: JDProject;
	databaseStateService: any;
	signInStateService: any;
}

const TheApp: FunctionComponent<Props> = ({ jdProject }) => {
	// console.debug("jdProject:", jdProject);
	// const { register, handleSubmit } = useForm();
	// const onSubmit = (formData) => {
	// 	console.debug("Your form's data:", formData);
	// userbase
	// 	.insertItem({
	// 		databaseName: "test-2020-09-08-14-16",
	// 		item: formData,
	// 	})
	// 	.then(() => console.debug("Your data was written."))
	// 	.catch(() => console.error("That didn't work"));
	// insertJDItem()
	// };

	return (
		<div>
			<div>This is the app</div>
			<hr />
			<Link to="account">Go to my account</Link>
			<hr />
			<AddJDItem jdProject={jdProject} />
			<hr />
			<div>Your data follows:</div>
			<ul>
				{jdProject ? (
					jdProject.data.map((item: UserbaseItem) => (
						<li className="ml-6 text-blue-600 list-disc" key={item.itemId}>
							{item.item.jdNumber}
						</li>
					))
				) : (
					<div>Loading...</div>
				)}
			</ul>
			{/* <form onSubmit={handleSubmit(onSubmit)}>
				<textarea
					className="border border-orange-500 rounded shadow-inner"
					name="JohnnyDecimal"
					ref={register}
				/>
				<button onClick={handleSubmit(onSubmit)}>Save</button>
			</form> */}
		</div>
	);
};

export default TheApp;
