// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent } from "react";
import { useMachine } from "@xstate/react";
import { Machine } from "xstate";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import displayDataMachine from "../machines/displayData.machine";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { RouteComponentProps } from "@reach/router";
import JDProject from "../@types/JDProject";

interface Props extends RouteComponentProps {
	jdProject: JDProject;
}

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const DisplayData: FunctionComponent<Props> = ({ jdProject }) => {
	const [displayDataState, displayDataSend] = useMachine(displayDataMachine);

	// @ts-ignore
	window.pear = displayDataState;

	// @ts-ignore
	window.banana = displayDataSend;

	const handleOnClick = (event: any) => {
		console.debug(event);
		displayDataSend("CLICK_ITEM");
	};

	const handleCancel = () => {
		displayDataSend("RETURN_TO_LIST");
	};

	// Construct the rows
	let tableRows: any = [];

	if (jdProject.data.length > 0) {
		jdProject.data.forEach((jdItem, index) => {
			if (jdItem.item.jdType === "area") {
				// Push a blank separator row
				tableRows.push(
					<tr key={1 / index}>
						<td>&nbsp;</td>
					</tr>
				);
			}

			tableRows.push(
				<tr
					className={index % 2 === 0 ? "bg-gray-100" : ""}
					key={index}
					onClick={handleOnClick}
				>
					<td className="px-4 py-2">{jdItem.item.jdNumber}</td>
					<td className="px-4 py-2">{jdItem.item.jdTitle}</td>
				</tr>
			);
		});
	}

	if (displayDataState.matches("displayingList")) {
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
	} else if (displayDataState.matches("displayingItem")) {
		return <div onClick={handleCancel}>Displaying Item</div>;
	} else {
		return <div>WTF</div>;
	}
};

export default DisplayData;
