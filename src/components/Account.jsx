/* eslint-disable react/prop-types */
import React from "react";
import { useService } from "@xstate/react";
import { Link } from "@reach/router";

const Account = ({ loginStateService }) => {
	// eslint-disable-next-line no-unused-vars
	const [loginState, loginStateSend] = useService(loginStateService);

	const signOut = () => {
		loginStateSend({
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
