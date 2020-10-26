import React from "react";
// import { createModel } from "@xstate/test";
import { getSimplePaths } from "@xstate/graph";
import { getShortestPaths } from "@xstate/graph";

import jdProjectMachineSimplified from "../machines/jdProjectSimplified.machine";

const ScratchPad = () => {
	console.debug("simple:", getSimplePaths(jdProjectMachineSimplified));
	console.debug("shortest:", getShortestPaths(jdProjectMachineSimplified));
	return <div>ScratchPad rendered</div>;
};

export default ScratchPad;
