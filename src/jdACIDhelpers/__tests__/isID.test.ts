import isID from "../isID";

test("isID() works", () => {
	expect(isID("00.00")).toBe(true);
	expect(isID("12.34")).toBe(true);
	expect(isID("99.99")).toBe(true);
	expect(isID("1019")).toBe(false);
	expect(isID("11-19")).toBe(false);
	expect(isID("10.19 ")).toBe(false);
});
