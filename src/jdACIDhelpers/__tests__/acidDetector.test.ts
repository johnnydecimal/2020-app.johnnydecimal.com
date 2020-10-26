import acidDetector from "../acidDetector";

test("acidDetector detects area", () => {
	expect(acidDetector("00-09")).toBe("area");
	expect(acidDetector("90-99")).toBe("area");
	expect(acidDetector("91-99")).toBe(false);
	expect(acidDetector("90-99 ")).toBe(false);
	expect(acidDetector("9099")).toBe(false);
});

test("acidDetector detects category", () => {
	expect(acidDetector("00")).toBe("category");
	expect(acidDetector("99")).toBe("category");
	expect(acidDetector("99 ")).toBe(false);
	expect(acidDetector("99a")).toBe(false);
});

test("acidDetector detects id", () => {
	expect(acidDetector("00.09")).toBe("id");
	expect(acidDetector("90.99")).toBe("id");
	expect(acidDetector("91.99")).toBe("id");
	expect(acidDetector("90.99 ")).toBe(false);
	expect(acidDetector("90.99a")).toBe(false);
});
