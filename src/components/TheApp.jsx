import React from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

const TheApp = () => (
	<div>
		<div>This is the app</div>
		<Link to="account">Go to my account</Link>
	</div>
);

export default TheApp;
