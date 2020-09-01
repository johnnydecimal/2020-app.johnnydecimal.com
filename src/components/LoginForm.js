// External
import React from "react";
import { useService } from "@xstate/react";
import { useForm } from "react-hook-form";
import userbase from "userbase-js";

const LoginForm = ({ loginStateService }) => {
	const { register, handleSubmit, watch, errors } = useForm();
	const [loginState, loginStateSend] = useService(loginStateService);

	const signIn = (formData) => {
		console.log("🎒signIn:", formData);
		/** So the login form needs to pass the credentials that the user has
		 *  entered *to the machine*, and the machine will do all of the logging in.
		 *
		 *  This will send an event to the service. They look like this:
		 *  https://xstate.js.org/docs/guides/events.html#sending-events
		 */
		loginStateSend({
			type: "TRY_SIGNIN",
			formData,
		});
	};

	const signUp = (formData) => {
		console.log("🦋signUp:", formData);
		loginStateSend({
			type: "TRY_SIGNUP",
			formData,
		});
	};

	return (
		<div className="">
			<h1 className="mb-2 text-2xl border-b border-gray-800 font-jdheader">
				Log in
			</h1>
			<p className="mb-4 text-xs">
				Do you need to{" "}
				<a href="#" className="text-blue-600">
					sign up?
				</a>
			</p>
			{loginState.context.error ? (
				<div className="text-red-700">{loginState.context.error.message}</div>
			) : null}
			<form onSubmit={handleSubmit(signIn)} className="flex flex-col">
				<label htmlFor="username" className="text-sm">
					Username
				</label>
				<input
					id="username"
					name="username"
					ref={register}
					className="px-2 py-1 mb-2 border-2 border-gray-800 rounded-md shadow-inner text-jdred-900 font-jdmono focus:outline-none focus:border-jdred-900 hover:border-jdred-900 focus:bg-jdred-100 hover:bg-jdred-100"
				/>
				<label htmlFor="password" className="text-sm">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					ref={register}
					className="px-2 py-1 mb-4 border-2 border-gray-800 rounded-md shadow-inner text-jdred-900 font-jdmono focus:outline-none focus:border-jdred-900 hover:border-jdred-900 focus:bg-jdred-100 hover:bg-jdred-100"
				/>
				<button
					className="h-10 bg-blue-300 border-t border-b-2 border-l-2 border-r border-blue-600 rounded shadow-md"
					onClick={handleSubmit(signIn)}
				>
					Log in
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
