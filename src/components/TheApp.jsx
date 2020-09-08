// External
import React from "react";
// import PropTypes from "prop-types";
import { Link } from "@reach/router";
import { useForm } from "react-hook-form";

const TheApp = () => {
	const { register, handleSubmit } = useForm();
	const onSubmit = (data) => console.debug(data);
	return (
		<div>
			<div>This is the app</div>
			<hr />
			<Link to="account">Go to my account</Link>
			<hr />
			<form onSubmit={handleSubmit(onSubmit)}>
				<textarea name="JohnnyDecimal" ref={register} />
				<button onClick={handleSubmit(onSubmit)}>Save</button>
			</form>
		</div>
	);
};

export default TheApp;
