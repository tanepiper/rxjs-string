/**
 * @packageDocumentation
 * @module String
 */
import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArrayOrSet } from '../types/array-set';
import { isArrayOrSet } from '../utils/array-set';

/**
 * Returns an Observable that emits a string from a source of character codes using String.fromCharCode
 *
 * @category String Mapping
 *
 * @see The [[fromCharCode]] Observable can be used to generate a string source from character codes
 *
 * @example
 * Returns a string `RxJS` from a source array of character codes
 * ```ts
 * of([82, 120, 74, 83]).pipe(mapCharCode()).subscribe()
 * ```
 * Output: `RxJS`
 *
 *
 * @returns Observable that emits a string from source character codes
 */
export function mapCharCode(): OperatorFunction<ArrayOrSet<number>, string> {
  return (source) =>
    source.pipe(map((values) => (isArrayOrSet(values) ? String.fromCharCode(...values) : String.fromCharCode(values))));
}
