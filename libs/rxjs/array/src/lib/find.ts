/**
 * @packageDocumentation
 * @module Array
 */

import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { PredicateFn } from '../types/generic-methods';
import { ArrayOrSet } from '../types/array-set';

/**
 * Returns an Observable value of the first truthy value found in a source array, or `undefined` using Array.find
 *
 * @category Filter
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param predicate Optional [[PredicateFn]] used to get a truthy value of array values
 *
 * @example
 * Return the first truthy string in the array
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja']
 * of(input).pipe(find()).subscribe();
 * ```
 * Output: `'Hello'`
 *
 * @example
 * Return the first truthy string that has a length `< 5`
 * ```ts
 * const input = ['', '', 'Hello', 'RxJS', 'Ninja'];
 * of(input).pipe(find(v => v.length < 5)).subscribe();
 * ```
 * Output: `'RxJS'`
 *
 * @returns An Observable that emits the first found value from the array, or `undefined`
 */
export function find<T extends unknown>(predicate?: PredicateFn<T>): OperatorFunction<ArrayOrSet<T>, T | undefined> {
  return (source) =>
    source.pipe(
      map((value) =>
        [...value].find((v) => {
          if (predicate && typeof v === 'number') {
            return predicate(v);
          }
          return predicate ? Boolean(v) && predicate(v) : Boolean(v);
        }),
      ),
    );
}
