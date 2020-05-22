/**
 * @packageDocumentation
 * @module array
 */
import { InputModifierFn, PredicateFn } from '../types/array-compare';

/**
 * Filter an array to find intersecting items with optional predicate method, otherwise
 * uses simple comparison
 * @param input The input array of values to check against the source
 * @param predicate Optional method for comparison
 *
 * @returns Function that is used with RxJS map method
 * @private
 * @internal
 */
export function mapDifferenceWith<T>(input: T[], predicate?: PredicateFn<T>): (value: T[]) => T[] {
  return (value: T[]): T[] =>
    value.filter(
      (sourceValue) =>
        input.findIndex((checkValue) => (predicate ? predicate(sourceValue, checkValue) : sourceValue === checkValue)) === -1,
    );
}

/**
 *
 * @param checkArray
 * @param mutate
 */
export function mapDifference<T, K>(checkArray: T[], mutate?: InputModifierFn<T, T | K>): (value: T[]) => T[] {
  if (mutate) {
    const checkSet = new Set(checkArray.map<T | K>(mutate));
    return (value: T[]) => [...new Set<T>(value)].filter((x) => !checkSet.has(mutate(x)));
  } else {
    const checkSet = new Set(checkArray);
    return (value: T[]) => [...new Set<T>(value)].filter((x) => !checkSet.has(x));
  }
}
