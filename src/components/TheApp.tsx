// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent } from "react";
import { Link, RouteComponentProps } from "@reach/router";

// === Internal components  ===-===-===-===-===-===-===-===-===-===-===-===-===
import AddJDItem from "./AddJDItem";
import DisplayData from "./DisplayData";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
// import { UserbaseItem } from "../@types/Userbase";
import JDProject from "../@types/JDProject";

interface Props extends RouteComponentProps {
	jdProject: JDProject;
	databaseStateService: any;
	signInStateService: any;
}

const TheApp: FunctionComponent<Props> = ({ jdProject }) => (
	<div>
		<div>This is the app</div>
		<hr />
		<Link to="account">Go to my account</Link>
		<hr />
		<AddJDItem jdProject={jdProject} />
		<hr />
		<div className="max-w-3xl mx-auto my-8">
			<DisplayData jdProject={jdProject} />
		</div>
		{/* <hr />
		<div>Your data follows:</div>
		<ul>
			{jdProject.data.map((item: UserbaseItem) => (
				<li className="ml-6 text-blue-600 list-disc" key={item.itemId}>
					{item.item.jdNumber}
				</li>
			))}
		</ul> */}
	</div>
);

export default TheApp;
