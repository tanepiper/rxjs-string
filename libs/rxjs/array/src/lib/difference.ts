/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction, Subscribable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { createOrReturnObservable } from '../utils/internal';

/**
 * Returns an Observable that emits an `Array` containing values from the source that are not contained in the
 * compare `Array` ot `Set`.
 *
 * @category Filter
 *
 * @see [[differenceAll]] operator for `Array` containing the difference from both source and comparison
 * @see [[filterDifference]] operator for an `Array` containing differences based on a [[PredicateFn]]
 *
 * @typeParam T Item type contained in the `Array`/`Set`
 *
 * @param compare `Array`/`Set` or Observable value to compare against for the difference
 *
 * @example
 * Returns the difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['a', 'c'])).subscribe();
 * ```
 * Output: `['b', 'd']`
 *
 * @returns Observable that emits an `Array` containing items from the source not in the comparison value
 */
export function difference<T extends unknown>(
  compare: Subscribable<Iterable<T>> | Iterable<T>,
): OperatorFunction<Iterable<T>, T[]> {
  const compare$ = createOrReturnObservable(compare);
  return (source) =>
    source.pipe(
      withLatestFrom(compare$),
      map(([value, compareValue]) => [new Set(value), new Set(compareValue)]),
      map(([value, compareValue]) => [...value].filter((x) => !compareValue.has(x))),
    );
}
