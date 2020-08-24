import React from "react";

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
		<div className="flex flex-col sm:flex-row-reverse">
			<main className="flex-grow mb-8 sm:w-3/4">Main content here</main>
			{/* Needs pixel-perfect margin to line up the header lines */}
			<div
				className="mb-8 sm:w-1/4 print:hidden"
				style={{ marginTop: "0.5rem" }}
			>
				{/* <TOC /> */}
				Table of contents here
			</div>
		</div>
	</div>
);

export default App;
