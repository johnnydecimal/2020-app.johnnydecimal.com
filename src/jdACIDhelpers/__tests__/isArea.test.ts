import isArea from "../isArea";

test("isArea() works", () => {
	expect(isArea("00-09")).toBe(true);
	expect(isArea("90-99")).toBe(true);
	expect(isArea("1019")).toBe(false);
	expect(isArea("11-19")).toBe(false);
	expect(isArea("10-19 ")).toBe(false);
});
