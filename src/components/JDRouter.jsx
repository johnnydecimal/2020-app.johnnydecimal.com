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

	console.debug("signInState.value:", signInState.value);
	console.debug("signInState.context:", signInState.context);

	if (signInState.matches("init")) {
		// == INITIALISING
		return <div className="text-3xl text-center text-red-600">INIT</div>;
	} else if (signInState.matches("error")) {
		// == FULLY BREAKING ERROR
		return (
			<div className="m-12 text-6xl text-red-600">
				ERROR! End-of-state. Done. Fubar.
			</div>
		);
	} else if (signInState.matches("signedIn")) {
		// == SIGNED IN
		return <JDSignedIn signInStateService={signInStateService} />;
	} else {
		// == NOT SIGNED IN
		return (
			<Router>
				<SignInForm path="/" signInStateService={signInStateService} />
				<SignUpForm path="signup" signInStateService={signInStateService} />
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
