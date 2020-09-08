// Externalcomponents
import React from "react";
import { useMachine } from "@xstate/react";
import { Router } from "@reach/router";

// Internal logic
import signInStateMachine from "../machines/signInState";

// Internal components
import FourOhFour from "./FourOhFour";
import JDSignedIn from "./JDSignedIn";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const JDRouter = () => {
	// prettier-ignore
	// eslint-disable-next-line no-unused-vars
	const [loginState, loginStateSend, loginStateService] = useMachine(
		signInStateMachine
	);

	console.debug("loginState.value:", loginState.value);
	console.debug("loginState.context:", loginState.context);

	if (loginState.matches("init")) {
		// == INITIALISING
		return <div className="text-3xl text-center text-red-600">INIT</div>;
	} else if (loginState.matches("error")) {
		// == FULLY BREAKING ERROR
		return (
			<div className="m-12 text-6xl text-red-600">
				ERROR! End-of-state. Done. Fubar.
			</div>
		);
	} else if (loginState.matches("signedIn")) {
		// == SIGNED IN
		return <JDSignedIn loginStateService={loginStateService} />;
	} else {
		// == NOT SIGNED IN
		return (
			<Router>
				<SignInForm path="/" loginStateService={loginStateService} />
				<SignUpForm path="signup" loginStateService={loginStateService} />
				{/* TODO: Needs something here to handle the edge cases, say where you
						were signed in, you're on /account, then you sign out. While the
						machine is in the signing-out phase, you'll see a flash of 
						404 until the action completes and you're `navigate`d to `/`.
						
						Be careful, though. You've got this lovely machine and now you're
						building all sorts of conditional checks. That's antithetical
						to the machine. */}
				<FourOhFour default />
			</Router>
		);
	}
};

export default JDRouter;
