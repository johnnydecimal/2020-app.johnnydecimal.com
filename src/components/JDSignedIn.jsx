// External
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Router } from "@reach/router";
// import userbase from "userbase-js";

// Internal logic
import databaseStateMachine from "../machines/userbaseState";

// Internal components
import Account from "./Account";
import FourOhFour from "./FourOhFour";
import TheApp from "./TheApp";
import { useMachine } from "@xstate/react";

const JDSignedIn = ({ signInStateService }) => {
	const [jdData, setJdData] = useState();
	// prettier-ignore
	// eslint-disable-next-line no-unused-vars
	const [databaseState, databaseStateSend, databaseStateService] = useMachine(
		databaseStateMachine,
		{
			context: {
				setJdData,
			},
		}
	);

	return (
		<Router>
			<Account path="account" signInStateService={signInStateService} />
			<TheApp
				path="/"
				jdData={jdData}
				databaseStateService={databaseStateService}
				signInStateService={signInStateService}
			/>
			<FourOhFour default />
		</Router>
	);
};

JDSignedIn.propTypes = {
	signInStateService: PropTypes.object.isRequired,
};

export default JDSignedIn;
