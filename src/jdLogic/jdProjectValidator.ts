// === External ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import { interpret } from "xstate";

// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import jdProjectMachine from "../machines/jdProject.machine";

// === Types    ===-===-===-===-===-===-===-===-===-===-===-===-===-===-===-===
import JDProject from "../@types/JDProject";

/**
 * # jdProjectValidator
 *
 * This function takes a `:JDProject` and tells you if it's valid or not.
 * It does this by running it through `jdProjectParser.machine`.
 *
 * The inputs are simple.
 * @param {Object} jdProject The `:JDProject`-like object to test.
 *
 * What should it return? It's got to be an object if you want it to be
 * consistent, and you've already got the `status` property on a `:JDProject`
 * so let's use it eh?
 *
 * So does that mean we just return a `:JDProject`? Yep. Easy.
 * @returns {Object} A `:JDProject`-like object.
 *
 * Let's be a good little functional programmer and not mutate the original.
 */

const jdProjectValidator = (jdProject: Readonly<JDProject>): JDProject => {
	const jdProjectMachineService = interpret(jdProjectMachine).start();

	const jdProjectCopy: JDProject = JSON.parse(JSON.stringify(jdProject));
	jdProjectCopy.status = "tbc";
	const jdProjectLength = jdProjectCopy.data.length;

	for (let i = 0; i < jdProjectLength; i++) {
		// We use the jdType as our machine transition, so we uppercase it
		const jdTypeUpperCase = jdProjectCopy.data[i].item.jdType.toUpperCase();
		jdProjectMachineService.send({
			type: jdTypeUpperCase,
			...jdProjectCopy.data[i].item,
		});

		if (jdProjectMachineService.state.matches("error")) {
			console.debug(
				"📮 here is the machine, pull out the error and load it in to jdProject"
			);
			console.debug(jdProjectMachineService);
			jdProjectCopy.status = "error";
			break;
		}
	}

	return jdProjectCopy;
};

export default jdProjectValidator;
