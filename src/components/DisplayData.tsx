// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent } from "react";
import { Machine } from "xstate";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import displayDataStateMachine from "../machines/displayData.machine";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { RouteComponentProps } from "@reach/router";
import JDProject from "../@types/JDProject";

interface Props extends RouteComponentProps {
	jdProject: JDProject;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const DisplayData: FunctionComponent<Props> = ({ jdProject }) => {
	// Construct the rows
	let tableRows: any = [];

	if (jdProject.data.length > 0) {
		// forEach when you don't return a value; map when you do
		// (eslint array-callback-return)
		jdProject.data.forEach((jdItem, index) => {
			if (jdItem.item.jdType === "area") {
				// Push a blank separator row
				tableRows.push(<tr>&nbsp;</tr>);
			}

			tableRows.push(
				<tr className={index % 2 === 0 ? "bg-gray-100" : ""}>
					<td className="px-4 py-2">{jdItem.item.jdNumber}</td>
					<td className="px-4 py-2">{jdItem.item.jdTitle}</td>
				</tr>
			);
		});
	}

	return (
		<table className="table-auto">
			<thead>
				<tr>
					<th className="px-4 py-2">Number</th>
					<th className="px-4 py-2">Title</th>
				</tr>
			</thead>
			<tbody>{tableRows}</tbody>
		</table>
	);
};

export default DisplayData;
