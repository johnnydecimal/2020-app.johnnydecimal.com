import React from "react";
import { useMachine } from "@xstate/react";

import Header from "./components/Header";
import loginStateMachine from "./machines/loginState";

const App = () => {
	const [loginState, loginStateSend] = useMachine(loginStateMachine);

	switch (loginState.value) {
		case "init":
			return (
				<div>
					<div>init</div>
					<button onClick={() => loginStateSend("NOT_LOGGED_IN")}>USER</button>
				</div>
			);

		case "notLoggedin":
			return <div>notLoggedin</div>;

		case "tryingLogin":
			return <div>tryingLogin</div>;

		case "loggedIn":
			return <div>loggedIn</div>;

		default:
			return <div>Theoretically impossible</div>;
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
