import { of } from 'rxjs';
import { intersectsWith } from './intersects-with';
import { marbles } from 'rxjs-marbles';
import { sort } from './sort';
import { sortMap } from './sort-map';

describe('sortMap', () => {
  it(
    'should return an sorted array of strings converted to uppercase',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: ['x', 'a', 'f'], b: ['v', 'n', 'e'], c: ['c', 'y', 'o'] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: ['A', 'F', 'X'], y: ['E', 'N', 'V'], z: ['C', 'O', 'Y'] });
      m.expect(input.pipe(sortMap((v) => v.toUpperCase()))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );

  it(
    'should return an sorted array of numbers multiplied by 10',
    marbles((m) => {
      const input = m.hot('-a-b-c-|', { a: [3, 1, 5], b: [0, 10, 2], c: [9, 8, 4] });
      const subs = '^------!';
      const expected = m.cold('-x-y-z-|', { x: [10, 30, 50], y: [0, 20, 100], z: [40, 80, 90] });
      m.expect(input.pipe(sortMap((v) => v * 10))).toBeObservable(expected);
      m.expect(input).toHaveSubscriptions(subs);
    }),
  );
});
