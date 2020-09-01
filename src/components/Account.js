/* eslint-disable react/prop-types */
import React from "react";
import { useService } from "@xstate/react";
import { Redirect } from "react-router-dom"

const Account = ({ loginStateService }) => {
	const [loginState, loginStateSend] = useService(loginStateService);

  if (loginState.matches("signedIn")) {
    return <div>Account page</div>
	} else {
		return <Redirect to="/" />;
	}
};

export default Account;
