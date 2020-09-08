// External
import React from "react";
import PropTypes from "prop-types";
import { Router } from "@reach/router";

// Internal components
import Account from "./Account";
import FourOhFour from "./FourOhFour";
import TheApp from "./TheApp";

const JDSignedIn = ({ loginStateService }) => {
	return (
		<Router>
			<Account path="account" loginStateService={loginStateService} />
			<TheApp path="/" loginStateService={loginStateService} />
			<FourOhFour default />
		</Router>
	);
};

JDSignedIn.propTypes = {
	loginStateService: PropTypes.object.isRequired,
};

export default JDSignedIn;
