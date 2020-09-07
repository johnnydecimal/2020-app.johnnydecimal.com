import React from "react";
import PropTypes from "prop-types";
import { useService } from "@xstate/react";

import SignInForm from "./SignInForm";

/**
 * # SignedInOrNot
 *
 * - If the user is signed in, return the application.
 * - If the user is not signed in, return a signin screen.
 *
 * @param {object} loginStateService - XState/loginStateMachine
 */
const SignedInOrNot = ({ loginStateService }) => {
	// eslint-disable-next-line no-unused-vars
	const [loginState, loginStateSend] = useService(loginStateService);

	if (loginState.matches("signedIn")) {
		return <div>You’re signed in, here’s the app</div>;
	} else {
		return <SignInForm loginStateService={loginStateService} />;
	}
};

SignedInOrNot.propTypes = {
	loginStateService: PropTypes.object.isRequired,
};

export default SignedInOrNot;
