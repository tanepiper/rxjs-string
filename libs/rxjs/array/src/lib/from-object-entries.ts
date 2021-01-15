/**
 * @packageDocumentation
 * @module Array
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Returns an Observable that emits an array from a source `Object` using Object.entries, the array contains
 * tuples of the key as a string and the value
 *
 * @category Create
 *
 * @remarks Regardless of Object key type the result Array will have a `string` key value
 *
 * @typeParam K The key type of the source Object
 * @typeParam T The value type of the source Object
 *
 * @example Convert an Object into an array of entries
 * ```ts
 * const input = { 1: 'a', 2: 'b', 3: 'c' };
 * of(input).pipe(fromObjectEntries()).subscribe();
 * ```
 * Output: `[ ['1', 'a'], ['2', 'b'], ['3', 'c'] ]`
 *
 * @returns Observable that emits a Array from a source Object entries
 */
export function fromObjectEntries<K extends string | number | symbol, T extends unknown>(): OperatorFunction<
  Record<K, T>,
  [string, T][]
> {
  return (source) => source.pipe(map((value) => Object.entries(value)));
}