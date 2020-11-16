// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import React, { FunctionComponent, MouseEvent } from "react";
import { useMachine } from "@xstate/react";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import displayDataMachine, {
	DisplayDataEvent,
} from "../machines/displayData.machine";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { RouteComponentProps } from "@reach/router";
import JDProject from "../@types/JDProject";
import { UserbaseItem } from "../@types/Userbase";

type DisplayListProps = {
	jdProject: JDProject;
};

type DisplayItemProps = {
	handleCancel: () => void;
	userbaseItem: UserbaseItem;
};

// === Main ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
const DisplayItem: FunctionComponent<DisplayItemProps> = ({
	handleCancel,
	userbaseItem,
}) => {
	console.log("DisplayItem/userbaseItem:", userbaseItem);
	return (
		<button onClick={handleCancel}>
			{userbaseItem.item.jdNumber} {userbaseItem.item.jdTitle}
		</button>
	);
};

const DisplayList: FunctionComponent<DisplayListProps> = ({ jdProject }) => {
	const [displayDataState, displayDataSend] = useMachine(displayDataMachine);

	const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
		// Get the full UserbaseItem from jdProject so we can feed it to the
		// display component.
		let selectedUserbaseItem;
		for (let userbaseItem of jdProject.data) {
			if (userbaseItem.itemId === event.currentTarget.dataset.itemid) {
				selectedUserbaseItem = userbaseItem;
				break;
			}
		}

		displayDataSend({
			type: "CLICK_ITEM",
			userbaseItem: selectedUserbaseItem,
		});
	};

	const handleCancel = () => {
		displayDataSend("RETURN_TO_LIST");
	};

	// Construct the rows
	let tableRows: any = [];

	if (jdProject.data.length > 0) {
		jdProject.data.forEach((userbaseItem, index) => {
			if (userbaseItem.item.jdType === "area") {
				// Push a blank separator row
				tableRows.push(
					<tr key={1 / index}>
						<td>&nbsp;</td>
					</tr>
				);
			}

			tableRows.push(
				<tr className={index % 2 === 0 ? "bg-gray-100" : ""} key={index}>
					<td>
						<button
							className="px-4 py-2"
							data-itemid={userbaseItem.itemId}
							onClick={handleOnClick}
						>
							{userbaseItem.item.jdNumber}
						</button>
					</td>
					<td>
						<button
							className="px-4 py-2"
							data-itemid={userbaseItem.itemId}
							onClick={handleOnClick}
						>
							{userbaseItem.item.jdTitle}
						</button>
					</td>
				</tr>
			);
		});
	}

	switch (true) {
		case displayDataState.matches("displayingList"):
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
		case displayDataState.matches("displayingItem"):
			if (displayDataState.context && displayDataState.context.userbaseItem) {
				return (
					<DisplayItem
						handleCancel={handleCancel}
						userbaseItem={displayDataState.context.userbaseItem}
					/>
				);
			} else {
				// TODO: Change to something that an error boundary can catch properly.
				throw new Error("🚨 Whoopa");
			}
		default:
			return <div>WTF</div>;
	}
};

export default DisplayList;
