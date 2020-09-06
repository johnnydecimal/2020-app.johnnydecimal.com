// External
import React from "react";
import { useMachine } from "@xstate/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Internal logic
import loginStateMachine from "./machines/loginState";

// Internal components
import SignedInOrNot from "./components/SignedInOrNot";
import SignUpForm from "./components/SignUpForm";

const App = () => {
	// prettier-ignore
	// eslint-disable-next-line no-unused-vars
	const [loginState, loginStateSend, loginStateService] = useMachine(
		loginStateMachine
	);

	console.log("loginState.value:", loginState.value);
	console.log("loginState.context:", loginState.context);

	return (
		<Router>
			<Switch>
				{/* <Route path="/account">
					<Account loginStateService={loginStateService} />
				</Route> */}
				<Route path="/signup">
					<SignUpForm loginStateService={loginStateService} />
				</Route>
				<Route path="/">
					<SignedInOrNot loginStateService={loginStateService} />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
