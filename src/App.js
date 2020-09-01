import React from "react";
import { useMachine } from "@xstate/react";

import Header from "./components/Header";
import loginStateMachine from "./machines/loginState";

const App = () => {
	const [loginState, loginStateSend] = useMachine(loginStateMachine);

	console.log("loginState.value:", loginState.value);
	// https://xstate.js.org/docs/packages/xstate-react/#matching-states
	switch (true) {
		case loginState.matches("init"):
			return <div>init</div>;

		case loginState.matches("notLoggedin"):
			return <div>notLoggedin</div>;

		case loginState.matches("tryingLogin"):
			return <div>tryingLogin</div>;

		case loginState.matches("loggedIn"):
			return <div>loggedIn</div>;

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
