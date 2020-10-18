// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React from "react";
import { useMachine } from "@xstate/react";
import { Router } from "@reach/router";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import newSignInStateMachine from "../machines/newSignInState.machine";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import FourOhFour from "./FourOhFour";
import JDSignedIn from "./JDSignedIn";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const JDRouter = () => {
	// prettier-ignore
	// eslint-disable-next-line no-unused-vars
	const [signInState, signInStateSend, signInStateService] = useMachine(
		newSignInStateMachine
	);

	switch (signInState.value) {
		case "init":
			// TODO: Pretty this up
			return <div className="text-3xl text-center text-red-600">INIT</div>;

		case "signedIn":
			return <JDSignedIn signInStateService={signInStateService} />;

		case "notSignedIn":
			return (
				<Router>
					<SignInForm path="/" signInStateService={signInStateService} />
					<SignUpForm path="signup" signInStateService={signInStateService} />
					<FourOhFour default signInState={signInState} />
				</Router>
			);

		case "error":
			// TODO: Pretty this up
			return (
				<div className="m-12 text-6xl text-red-600">
					ERROR! End-of-state. Done. Fubar.
				</div>
			);

		/**
		 * All other conditions are captured here -- the `trying...` states and
		 * anything else not specifically handled above. This works out to be a much
		 * nicer way of handling this -- when this was an `if...then` situation you
		 * saw 404s when signing out, but now this captures those little edge cases.
		 */
		default:
			return <div>doing a network thing ... standby one</div>;
	}
};

export default JDRouter;
