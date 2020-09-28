/* eslint-disable react/prop-types */
import React from "react";
import { useService } from "@xstate/react";
import { Link } from "@reach/router";
import { RouteComponentProps } from "@reach/router";

const Account = ({ signInStateService }: any, props: RouteComponentProps) => {
	// eslint-disable-next-line no-unused-vars
	const [signInState, signInStateSend] = useService(signInStateService);

	const signOut = () => {
		signInStateSend({
			type: "TRY_SIGNOUT",
		});
	};

	return (
		<div>
			<Link to="/">Go back to the app</Link>
			<hr />
			<button onClick={signOut}>Sign out</button>
		</div>
	);
};

export default Account;
