/**
 * testJDString is a test string that you can use to validate multi-line
 * JD input.
 *
 * If this string is updated, update jdFileParser.test.js.
 */
const validTestJDString: string = `10-19     My special area
   11     My cool category
   11.01  ID me yeah
   11.02  Whatever
   12     Great

20-29     Another area // which has a comment
   22     Spiffy
   22.22  Aha`;

// Test for JDE12.12: An area which immediately follows another area has an
// area number lower than the preceding area.
const jderr12_12 = `20-29 area
10-19 error`;

// Test for JDE12.13: An area which follows a category has an area number
// lower than the preceding area.
const jderr12_13 = `20-29 area
21 category
10-19 error`;

// Test for JDE12.14: An area which follows an ID has an area number lower
// than the preceding area.
const jderr12_14 = `20-29 area
21 category
21.01 id
10-19 error`;

// Test for JDE13.13: A category which immediately follows another category
// has a category number lower than the preceding category.
const jderr13_13 = `20-29 area
22 category
21 error`;

// Test for JDE13.14: A category which follows an ID has a category number
// lower than the preceding category.
const jderr13_14 = `20-29 area
22 category
22.01 id
21 error`;

// Test for JDE14.14: An ID which follows an ID has an ID lower than the
// preceding ID.
const jderr14_14 = `20-29 area
22 category
22.02 id
22.01 error`;

// Test for JDE23.22: A category does not belong to its parent area.
const jderr23_22 = `20-29 area
02 category
`;

// Test for JDE24.23: An ID does not belong to its parent category.
const jderr24_23 = `20-29 area
22 category
02.01 id
`;

// Test for JDE41.11: Garbage input.
const jderr41_11_01 = `garbage at the start`;
const jderr41_11_02 = `10-19 area
garbage after an area`;
const jderr41_11_03 = `10-19 area
11 category
garbage after a category`;
const jderr41_11_04 = `10-19 area
11 category
11.01 id
garbage after an id`;

export {
  validTestJDString,
  jderr12_12,
  jderr12_13,
  jderr12_14,
  jderr13_13,
  jderr13_14,
  jderr14_14,
  jderr23_22,
  jderr24_23,
  jderr41_11_01,
  jderr41_11_02,
  jderr41_11_03,
  jderr41_11_04,
};
