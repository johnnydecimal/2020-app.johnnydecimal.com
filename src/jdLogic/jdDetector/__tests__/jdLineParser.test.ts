import jdLineParser from '../jdLineParser';

test('detects a correct Project', () => {
  expect(jdLineParser('101 my great project').jdType).toBe('project');
  expect(jdLineParser('101 my great project').jdNumber).toBe('101');
  expect(jdLineParser('101 my great project').jdTitle).toBe('my great project');
  expect(jdLineParser('101 my great project // with comment').jdType).toBe(
    'project'
  );
  expect(jdLineParser('101 my great project // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct Area', () => {
  expect(jdLineParser('10-19 my special area').jdType).toBe('area');
  expect(jdLineParser('10-19 my special area').jdNumber).toBe('10-19');
  expect(jdLineParser('10-19 my special area').jdTitle).toBe('my special area');
  expect(jdLineParser('90-99 my special area').jdType).toBe('area');
  expect(jdLineParser('90-99 my special area // with comment').jdType).toBe(
    'area'
  );
  expect(jdLineParser('90-99 my special area // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct Category', () => {
  expect(jdLineParser('10 my cracking cat').jdType).toBe('category');
  expect(jdLineParser('10 my cracking cat').jdNumber).toBe('10');
  expect(jdLineParser('10 my cracking cat').jdTitle).toBe('my cracking cat');
  expect(jdLineParser('10 my cracking cat // with comment').jdType).toBe(
    'category'
  );
  expect(jdLineParser('10 my cracking cat // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct ID', () => {
  expect(jdLineParser('12.34 my interesting id').jdType).toBe('id');
  expect(jdLineParser('12.34 my interesting id').jdNumber).toBe('12.34');
  expect(jdLineParser('12.34 my interesting id').jdTitle).toBe(
    'my interesting id'
  );
  expect(jdLineParser('12.34 my interesting id // with comment').jdType).toBe(
    'id'
  );
  expect(jdLineParser('12.34 my interesting id // with comment').comment).toBe(
    'with comment'
  );
});

test('detects a correct divider', () => {
  expect(jdLineParser('-').jdType).toBe('divider');
  expect(jdLineParser('--------------').jdType).toBe('divider');
  expect(jdLineParser('--------------').comment).toBe('--------------');
});

test('detects a correct one-line // comment', () => {
  expect(jdLineParser('// This is fine').jdType).toBe('comment');
  expect(jdLineParser('// 10-19 This is still a comment').jdType).toBe(
    'comment'
  );
  expect(jdLineParser('//').jdType).toBe('comment');
});

test('returns error on nonsense', () => {
  expect(jdLineParser('10a not a project').jdType).toBe('error');
  expect(jdLineParser('10a not a project').error).toBe('Nothing matched.');
  expect(jdLineParser('10-99 not an area').jdType).toBe('error');
  expect(jdLineParser('10-99 not an area').error).toBe('Nothing matched.');
  expect(jdLineParser('10-29 not an area').jdType).toBe('error');
  expect(jdLineParser('10-29 not an area').error).toBe('Nothing matched.');
  expect(jdLineParser('1x-19 not an area').jdType).toBe('error');
  expect(jdLineParser('1x-19 not an area').error).toBe('Nothing matched.');
  expect(jdLineParser('1x not a category').jdType).toBe('error');
  expect(jdLineParser('1x not a category').error).toBe('Nothing matched.');
  expect(jdLineParser('1x.19 not an id').jdType).toBe('error');
  expect(jdLineParser('1x.19 not an id').error).toBe('Nothing matched.');
  // There must be a space after the number
  expect(jdLineParser('100not a project').jdType).toBe('error');
  expect(jdLineParser('100not a project').error).toBe('Nothing matched.');
  expect(jdLineParser('10-19not an area').jdType).toBe('error');
  expect(jdLineParser('10-19not an area').error).toBe('Nothing matched.');
  expect(jdLineParser('10not a category').jdType).toBe('error');
  expect(jdLineParser('10not a category').error).toBe('Nothing matched.');
  expect(jdLineParser('10.01not an id').jdType).toBe('error');
  expect(jdLineParser('10.01not an id').error).toBe('Nothing matched.');
  expect(jdLineParser('----not a divider').jdType).toBe('error');
  expect(jdLineParser('----not a divider').error).toBe('Nothing matched.');
});

test('rejects multi-line strings', () => {
  expect(
    jdLineParser(`10-19 valid area
  aha but not really in a multi-line string!`).jdType
  ).toBe('error');
  expect(
    jdLineParser(`10-19 valid area
  aha but not really in a multi-line string!`).error
  ).toBe('Multi-line input not allowed.');
});

test('items must have a title', () => {
  // TODO Error could be improved, currently this just returns a generic
  //      'nothing matched'.
  expect(jdLineParser('100').jdType).toBe('error');
  expect(jdLineParser('100').error).toBe('Nothing matched.');
  expect(jdLineParser('100     ').jdType).toBe('error');
  expect(jdLineParser('100     ').error).toBe('Nothing matched.');
  expect(jdLineParser('10-19').jdType).toBe('error');
  expect(jdLineParser('10-19').error).toBe('Nothing matched.');
  expect(jdLineParser('10-19   ').jdType).toBe('error');
  expect(jdLineParser('10-19   ').error).toBe('Nothing matched.');
  expect(jdLineParser('10').jdType).toBe('error');
  expect(jdLineParser('10').error).toBe('Nothing matched.');
  expect(jdLineParser('10      ').jdType).toBe('error');
  expect(jdLineParser('10      ').error).toBe('Nothing matched.');
  expect(jdLineParser('12.34').jdType).toBe('error');
  expect(jdLineParser('12.34').error).toBe('Nothing matched.');
  expect(jdLineParser('12.34   ').jdType).toBe('error');
  expect(jdLineParser('12.34   ').error).toBe('Nothing matched.');
});
