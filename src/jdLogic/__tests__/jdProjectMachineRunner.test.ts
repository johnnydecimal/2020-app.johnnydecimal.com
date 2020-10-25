// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import jdProjectMachineRunner from "../jdProjectMachineRunner";

import * as d from "../../testdata/jdProjectMachineRunner.data";

test("Valid projects pass", () => {
	expect(jdProjectMachineRunner(d.passA).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passAC).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passACID).status).toBe("valid");
});

test("10-19 Out of order and duplicate entry errors", () => {
	// Things can't be out of order in the current implementation, as we
	// explicitly sort them.
	expect(jdProjectMachineRunner(d.fail1222).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail1222).error).toBe("JDE12.22");

	expect(jdProjectMachineRunner(d.fail1323).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail1323).error).toBe("JDE13.23");

	expect(jdProjectMachineRunner(d.fail1424).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail1424).error).toBe("JDE14.24");
});

test("20-29 Ownership errors", () => {
	expect(jdProjectMachineRunner(d.fail2301).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail2301).error).toBe("JDE23.01");

	expect(jdProjectMachineRunner(d.fail2322).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail2322).error).toBe("JDE23.22");

	expect(jdProjectMachineRunner(d.fail2423).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail2423).error).toBe("JDE24.23");

	expect(jdProjectMachineRunner(d.fail2401).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail2401).error).toBe("JDE24.01");
});
