import React from "react";

import { useForm } from "react-hook-form";

const LoginForm = () => {
	const { register, handleSubmit, watch, errors } = useForm();

	const onSubmit = (data) => console.log(data);

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
			<p>
				Himenaeos luctus porta urna suscipit litora sociosqu mattis maecenas
				egestas risus eleifend ullamcorper semper, non sem eget facilisis
				iaculis nascetur phasellus cum consequat aliquet imperdiet. Sagittis
				porta ullamcorper purus id varius facilisis pellentesque suspendisse
				magna integer rhoncus morbi viverra, ultrices etiam per eget commodo
				dolor semper platea feugiat taciti aenean nam metus, dictum euismod
				lorem donec scelerisque orci parturient ornare nisi tristique suscipit
				iaculis. Torquent parturient mauris dictum habitasse placerat cubilia
				massa viverra, rutrum suspendisse pretium integer mattis urna.
			</p>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				<label for="username" className="text-sm">
					Username
				</label>
				<input
					id="username"
					name="username"
					ref={register}
					className="px-2 py-1 mb-2 border-2 border-gray-800 rounded-md text-jdred-900 font-jdmono focus:outline-none focus:border-jdred-900 hover:border-jdred-900 focus:bg-jdred-100 hover:bg-jdred-100"
				/>
				<label for="password" className="text-sm">
					Password
				</label>
				<input
					id="password"
					name="password"
					type="password"
					ref={register}
					className="px-2 py-1 mb-4 border-2 border-gray-800 rounded-md text-jdred-900 font-jdmono focus:outline-none focus:border-jdred-900 hover:border-jdred-900 focus:bg-jdred-100 hover:bg-jdred-100"
				/>
				<button className="h-12 bg-blue-300 border-t border-b-2 border-l-2 border-r border-blue-600 rounded shadow-md">
					Log in
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
