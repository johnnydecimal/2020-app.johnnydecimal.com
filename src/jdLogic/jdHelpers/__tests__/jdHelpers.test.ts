import isAreaOrderValid from '../isAreaOrderValid';
import isCategoryOrderValid from '../isCategoryOrderValid';
import isIDOrderValid from '../isIDOrderValid';

import isCategoryInArea from '../isCategoryInArea';
import isIDInCategory from '../isIDInCategory';

test('isAreaOrderValid', () => {
  expect(isAreaOrderValid('10-19', '40-49')).toBe(true);
  expect(isAreaOrderValid('40-49', '10-19')).toBe(false);
});

test('isCategoryOrderValid', () => {
  expect(isCategoryOrderValid('10', '11')).toBe(true);
  expect(isCategoryOrderValid('12', '11')).toBe(false);
});

test('isIDOrderValid', () => {
  expect(isIDOrderValid('10.12', '10.13')).toBe(true);
  expect(isIDOrderValid('00.12', '99.13')).toBe(true);
  expect(isIDOrderValid('10.13', '10.12')).toBe(false);
  expect(isIDOrderValid('99.13', '00.12')).toBe(false);
});

test('category is in area', () => {
  expect(isCategoryInArea('10-19', '10')).toBe(true);
  expect(isCategoryInArea('00-09', '00')).toBe(true);
  expect(isCategoryInArea('10-19', '20')).toBe(false);
});

test('id is in category', () => {
  expect(isIDInCategory('10', '10.12')).toBe(true);
  expect(isIDInCategory('00', '00.12')).toBe(true);
  expect(isIDInCategory('10', '20.12')).toBe(false);
  expect(isIDInCategory('00', '20.12')).toBe(false);
});
