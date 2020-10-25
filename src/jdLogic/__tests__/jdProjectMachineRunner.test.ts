// === Internal logic   ===-===-===-===-===-===-===-===-===-===-===-===-===-===
import jdProjectMachineRunner from "../jdProjectMachineRunner";

import * as d from "../../testdata/jdProjectMachineRunner.data";

test("valid projects pass", () => {
	expect(jdProjectMachineRunner(d.passA).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passAC).status).toBe("valid");
	expect(jdProjectMachineRunner(d.passACID).status).toBe("valid");
});

test("20-29 Ownership errors", () => {
	expect(jdProjectMachineRunner(d.fail2322).status).toBe("error");
	expect(jdProjectMachineRunner(d.fail2423).status).toBe("error");
});
