// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import jdProjectMachineRunner from "../jdProjectMachineRunner";

import * as d from "../../testdata/jdProjectMachineRunner.data";

test("Valid projects pass", () => {
	expect(jdProjectMachineRunner(d.passA).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passAC).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passACID).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passACIDID).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passACCID).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passAACID).status).toBe("valid");

	expect(jdProjectMachineRunner(d.passJDE1212).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passJDE1213).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passJDE1214).status).toBe("valid");

	expect(jdProjectMachineRunner(d.passJDE1313).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passJDE1314).status).toBe("valid");

	expect(jdProjectMachineRunner(d.passJDE1414).status).toBe("valid");
});

test("10-19 Out of order and duplicate entry errors", () => {
	// Things can't be out of order in the current implementation, as we
	// explicitly sort them. Duplicates can still be an error.
	expect(jdProjectMachineRunner(d.jde1222).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde1222).error).toBe("JDE12.22");

	expect(jdProjectMachineRunner(d.jde1323).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde1323).error).toBe("JDE13.23");

	expect(jdProjectMachineRunner(d.jde1424).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde1424).error).toBe("JDE14.24");
});

test("20-29 Ownership errors", () => {
	expect(jdProjectMachineRunner(d.jde2301).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde2301).error).toBe("JDE23.01");
	expect(jdProjectMachineRunner(d.jde2401).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde2401).error).toBe("JDE24.01");

	expect(jdProjectMachineRunner(d.jde2322a).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde2322a).error).toBe("JDE23.22");
	expect(jdProjectMachineRunner(d.jde2322b).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde2322b).error).toBe("JDE23.22");

	expect(jdProjectMachineRunner(d.jde2423a).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde2423a).error).toBe("JDE24.23");
	expect(jdProjectMachineRunner(d.jde2423b).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde2423b).error).toBe("JDE24.23");
});

test("30-39 Missing errors", () => {
	expect(jdProjectMachineRunner(d.jde3301).status).toBe("error");
	expect(jdProjectMachineRunner(d.jde3301).error).toBe("JDE33.01");
});
