import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";

const App = () => (
	<div className="max-w-5xl px-4 mx-auto leading-relaxed text-offblack sm:px-8 font-jdbody">
		<header className="mt-2 mb-4 text-base text-gray-800 border-b-2 border-gray-400 sm:mb-6">
			<span
				className="inline px-2 mb-1 mr-8 text-base font-semibold text-red-700 border-b-2 border-red-700 sm:px-4"
				style={{ paddingBottom: "3px" }}
			>
				<a href="https://johnnydecimal.com">Johnny&bull;Decimal</a>
			</span>
		</header>
		<div className="grid justify-center align-middle">
			<LoginForm />
		</div>
	</div>
);

export default App;
