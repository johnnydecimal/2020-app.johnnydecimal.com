// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent, useState } from "react";
import { Router } from "@reach/router";
import { useMachine } from "@xstate/react";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import databaseStateMachine from "../machines/userbaseState.machine";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import Account from "./Account";
import FourOhFour from "./FourOhFour";
import TheApp from "./TheApp";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDProject from "../@types/JDProject";

interface Props {
	signInStateService: unknown;
}

/**
 * # JDSignedIn
 *
 * We're signed in.
 *
 * @param signInStateService We need access to `signInStateService` so we can
 *                           log out, or whatever.
 */
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
	 *
	 * We pass it an empty project initially (just to keep TS happy), as this will
	 * be immediately replaced by whatever is returned from Userbase.
	 *
	 * // TODO: Test what happens when you sign up as a new user. The object that
	 *          Userbase returns will be empty; it won't be an empty JDProject.
	 */
	const emptyProject: JDProject = { status: "valid", data: [] };
	const [jdProject, setJdProject] = useState(emptyProject);

	/**
	 * Initiate the database machine. On initialisation, this opens the connection
	 * to Userbase and sets up the changeHandler function. Inside this function
	 * we'll do some validation and then call `setJdProject()` to get the Userbase
	 * data in to app state.
	 *
	 * In the future we'll also pass this a `databaseName`, which will correspond
	 * to the current project. For now, this is just a fixed value as we're only
	 * supporting a single project, so there's nothing to pass.
	 */
	const [, , databaseStateService] = useMachine(databaseStateMachine, {
		context: {
			setJdProject,
		},
	});

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

export default JDSignedIn;
