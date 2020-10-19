// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent } from "react";
import { useService } from "@xstate/react";
import { Link, RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
	signInStateService: any;
}

const Account: FunctionComponent<Props> = ({ signInStateService }) => {
	const [, signInStateSend] = useService(signInStateService);

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
