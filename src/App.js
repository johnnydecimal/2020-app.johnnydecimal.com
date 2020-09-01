// External
import React from "react";
import { useMachine } from "@xstate/react";

// Internal logic
import loginStateMachine from "./machines/loginState";

// Internal views
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";

const App = () => {
	const [loginState, loginStateSend, loginStateService] = useMachine(
		loginStateMachine
	);

	console.log("loginState.value:", loginState.value);
	console.log("loginState.context:", loginState.context);
	// https://xstate.js.org/docs/packages/xstate-react/#matching-states
	switch (true) {
		case loginState.matches("init"):
			return <div>init</div>;

		case loginState.matches("notSignedIn"):
			return (
				<div className="max-w-lg mx-auto">
					<LoginForm
						loginStateSend={loginStateSend}
						loginStateService={loginStateService}
					/>
				</div>
			);

		case loginState.matches("tryingSignIn"):
			return <div>tryingLogin</div>;

		case loginState.matches("tryingSignUp"):
			return <div>tryingSignUp</div>;

		case loginState.matches("signedIn"):
			return (
				<div>
					<div>loggedIn</div>
					<div>{loginState.context.user.data.username}</div>
				</div>
			);

		default:
			return <div>Something else. Must be an error.</div>;
	}
	// return (
	// 	<div className="max-w-5xl px-4 mx-auto leading-relaxed text-offblack sm:px-8 font-jdbody">
	// 		<Header />
	// 		{console.log("loginState:", loginState)}
	// 		<div>loginState: {loginState.value}</div>
	// 		{/* Need some logic here to decide what to show. */}
	// 		{/* Aah no, not here. Way up above return(), use a switch/case there
	// 					and then return an entire component. So it's all pure JS, not
	// 					this weird JS-in-braces situation down here. */}
	// 	</div>
	// );
};

export default App;
