// External
import React, { FunctionComponent, useState } from "react";
import PropTypes from "prop-types";
import { Router } from "@reach/router";
// import userbase from "userbase-js";

// Internal logic
import databaseStateMachine from "../machines/userbaseState.machine";

// Internal components
import Account from "./Account";
import FourOhFour from "./FourOhFour";
import TheApp from "./TheApp";
import { useMachine } from "@xstate/react";

import JDProject from "../@types/JDProject";

interface Props {
	signInStateService: any;
}

const JDSignedIn: FunctionComponent<Props> = ({ signInStateService }) => {
	/**
	 * # jdProject
	 *
	 * This is your data. We call it jdProject because, in the first version of
	 * this app, it is only possible to have one project loaded at any time.
	 *
	 * In fact that's probably how it will always be, given that we're going to
	 * store a project in a Userbase database. One project, one database. If you
	 * want to load another project, we close the database and establish a new
	 * connection.
	 */
	const emptyProject: JDProject = {
		status: "valid",
		data: [],
	};
	const [jdProject, setJdProject] = useState(emptyProject);
	// TODO: How do you set the call signature for `setJdProject` in TS? Catch
	//       errors, remember now you need to `setJdProject({data: [...]})`.
	// prettier-ignore
	// eslint-disable-next-line no-unused-vars
	const [databaseState, databaseStateSend, databaseStateService] = useMachine(
		databaseStateMachine,
		{
			context: {
				setJdProject,
			},
		}
	);

	console.debug("🐝 jdProject @ JDSignedIn follows");
	console.debug(jdProject);

	return (
		<Router>
			<Account path="account" signInStateService={signInStateService} />
			<TheApp
				path="/"
				jdProject={jdProject}
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