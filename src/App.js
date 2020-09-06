// External
import React from "react";
import { useMachine } from "@xstate/react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Internal logic
import loginStateMachine from "./machines/loginState";

// Internal views
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Account from "./components/Account";

const SignUp = () => <div>SignUp</div>;
const JohnnyDecimal = () => <div>Johnny.Decimal</div>;

const App = () => {
	const [loginState, loginStateSend, loginStateService] = useMachine(
		loginStateMachine,
	);

	// console.log("loginState.value:", loginState.value);
	// console.log("loginState.context:", loginState.context);
	// console.log("🥕 loginStateService:", loginStateService);
	// https://xstate.js.org/docs/packages/xstate-react/#matching-states

	return (
		<Router>
			<Switch>
				<Route path="/account">
					<Account loginStateService={loginStateService} />
				</Route>
				<Route path="/signup">
					<SignUp loginStateService={loginStateService} />
				</Route>
				<Route path="/">
					<JohnnyDecimal loginStateService={loginStateService} />
				</Route>
			</Switch>
		</Router>
	);
	// switch (true) {
	// 	case loginState.matches("init"):
	// 		return <div>init</div>;

	// 	case loginState.matches("notSignedIn"):
	// 		return (
	// 			<div className="max-w-lg mx-auto">
	// 				<LoginForm
	// 					loginStateSend={loginStateSend}
	// 					loginStateService={loginStateService}
	// 				/>
	// 			</div>
	// 		);

	// 	case loginState.matches("tryingSignIn"):
	// 		return <div>tryingLogin</div>;

	// 	case loginState.matches("tryingSignUp"):
	// 		return <div>tryingSignUp</div>;

	// 	case loginState.matches("signedIn"):
	// 		return (
	// 			<div>
	// 				<div>loggedIn</div>
	// 				<div>{loginState.context.user.data.username}</div>
	// 			</div>
	// 		);

	// 	default:
	// 		return <div>Something else. Must be an error.</div>;
	// }
};

export default App;
