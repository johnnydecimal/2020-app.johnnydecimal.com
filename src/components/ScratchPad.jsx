import React from "react";
// import { createModel } from "@xstate/test";
import { getSimplePaths } from "@xstate/graph";
import { getShortestPaths } from "@xstate/graph";

import jdProjectMachine from "../machines/jdProject.machine";

const ScratchPad = () => {
	console.debug(getSimplePaths(jdProjectMachine));
	console.debug(getShortestPaths(jdProjectMachine));
	return <div>ScratchPad rendered</div>;
};

export default ScratchPad;
