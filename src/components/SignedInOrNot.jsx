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
 * @param {object} signInStateService - XState/signInStateMachine
 */
const SignedInOrNot = ({ signInStateService }) => {
	// eslint-disable-next-line no-unused-vars
	const [signInState, signInStateSend] = useService(signInStateService);

	if (signInState.matches("signedIn")) {
		return <div>You’re signed in, here’s the app</div>;
	} else {
		return <SignInForm signInStateService={signInStateService} />;
	}
};

SignedInOrNot.propTypes = {
	signInStateService: PropTypes.object.isRequired,
};

export default SignedInOrNot;
