// External
import React, { useState } from "react";
import { useMachine } from "@xstate/react";
// import {
// 	BrowserRouter as Router,
// 	Redirect,
// 	Route,
// 	Switch,
// } from "react-router-dom";
import { Router } from "@reach/router";

// Internal logic
import loginStateMachine from "./machines/loginState";

// Internal components
import Account from "./components/Account";
import SignedInOrNot from "./components/SignedInOrNot";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import TheApp from "./components/TheApp";

const App = () => {
	// prettier-ignore
	// eslint-disable-next-line no-unused-vars
	const [loginState, loginStateSend, loginStateService] = useMachine(
		loginStateMachine
	);
	const [redirectMessage, setRedirectMessage] = useState("");

	console.log("loginState.value:", loginState.value);
	console.log("loginState.context:", loginState.context);

	if (loginState.matches("init")) {
		// == INITIALISING
		return <div className="m-12 text-3xl text-red-600">INIT</div>;
	} else if (loginState.matches("error")) {
		return (
			<div className="m-12 text-6xl text-red-600">
				ERROR! End-of-state. Done. Fubar.
			</div>
		);
	} else if (loginState.matches("signedIn")) {
		// == SIGNED IN
		return (
			<Router>
				<Account path="account" loginStateService={loginStateService} />
				<TheApp path="/" loginStateService={loginStateService} />
			</Router>
		);
	} else {
		// == NOT SIGNED IN
		return (
			<Router>
				<SignInForm path="/" loginStateService={loginStateService} />
			</Router>
		);
	}

	/*
	if (loginState.matches("init")) {
		return <div className="text-lg text-red-600">INIT</div>;
	} else if (loginState.matches("signedIn")) {
		// == SIGNED IN ===========================================================
		return (
			<Router>
				<Switch>
					<Route path="/account">
						<Account loginStateService={loginStateService} />
					</Route>
					<Route path="/signup">
						<Redirect to="/account" />
					</Route>
				</Switch>
			</Router>
		);
	} else {
		// == NOT SIGNED IN =======================================================
		return (
			<Router>
				<Switch>
					<Route path="/account">
						<SignInForm
							loginStateService={loginStateService}
							redirectMessage={"You need to be signed in to visit that page."}
						/>
					</Route>
					<Route path="/signup">
						<SignUpForm loginStateService={loginStateService} />
					</Route>
				</Switch>
			</Router>
		);
	}
	
	return (
		<Router>
		<Switch>
		<Route path="/account">
		{loginState.matches("signedIn") ? (
			<Account loginStateService={loginStateService} />
			) : (
				<SignInForm loginStateService={loginStateService} />
				)}
				</Route>
				<Route path="/signup">
				<SignUpForm loginStateService={loginStateService} />
				</Route>
				<Route path="/">
				<SignedInOrNot loginStateService={loginStateService} />
				</Route>
				</Switch>
				</Router>
				);
	*/
};

export default App;
