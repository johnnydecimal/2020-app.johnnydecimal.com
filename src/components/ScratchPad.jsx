import React from "react";
import { createModel } from "@xstate/test";

import jdProjectMachine from "../machines/jdProject.machine";

const ScratchPad = () => {
	const jdMachineTestModel = createModel(jdProjectMachine);
	console.debug(jdMachineTestModel);
	return <div>ScratchPad rendered</div>;
};

export default ScratchPad;
