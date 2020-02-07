import { initializeReducer, operations, reducer, selectors } from '../index';

it('exporting react module', () => {
  expect(initializeReducer).toBeDefined();
  expect(operations).toBeDefined();
  expect(reducer).toBeDefined();
  expect(selectors).toBeDefined();
});
