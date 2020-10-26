import isCategory from "../isCategory";

test("isCategory() works", () => {
	expect(isCategory("00")).toBe(true);
	expect(isCategory("99")).toBe(true);
	expect(isCategory("019")).toBe(false);
	expect(isCategory("19 ")).toBe(false);
	expect(isCategory("18a")).toBe(false);
});
