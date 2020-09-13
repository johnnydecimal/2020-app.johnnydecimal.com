// External
import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";
import userbase from "userbase-js";

const TheApp = ({ jdData }) => {
	// console.debug("jdData:", jdData);
	const { register, handleSubmit } = useForm();
	const onSubmit = (formData) => {
		console.debug("Your form's data:", formData);
		userbase
			.insertItem({
				databaseName: "test-2020-09-08-14-16",
				item: formData,
			})
			.then(() => console.debug("Your data was written."))
			.catch(() => console.error("That didn't work"));
	};

	return (
		<div>
			<div>This is the app</div>
			<hr />
			<Link to="account">Go to my account</Link>
			<hr />
			<div>Your data follows:</div>
			<ul>
				{jdData ? (
					jdData.map((item) => (
						<li className="ml-6 text-blue-600 list-disc" key={item.itemId}>
							{item.item.jdNumber}
						</li>
					))
				) : (
					<div>Loading...</div>
				)}
			</ul>
			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea
					className="border border-orange-500 rounded shadow-inner"
					name="JohnnyDecimal"
					ref={register}
				/>
				<button onClick={handleSubmit(onSubmit)}>Save</button>
			</form>
		</div>
	);
};

TheApp.propTypes = {
	jdData: PropTypes.array,
};
export default TheApp;
