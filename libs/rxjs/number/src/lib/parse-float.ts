/**
 * @packageDocumentation
 * @module number
 */
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * The `parseFloat` operator can be used with an RxJS `pipe` where the source value
 * is an [Observable](https://rxjs-dev.firebaseapp.com/guide/observable) string.
 *
 * The operator will attempt to convert the string value to a floating point number using
 * [Number.parseFloat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat)
 *
 * ![parseFloat Marble Diagram](../assets/marble/number/parseFloat.svg)
 *
 * @example
 * ```ts
 * from(['1', '2.8', '3.14']).pipe(parseFloat(), reduce((acc, val) => {
 *   acc.push(val);
 *   return acc;
 * }, [])).subscribe(console.log) // [1, 2.8, 3.14]
 * ```
 *
 * @returns A number that is parsed from a string using `Number.parseFloat
 * @category RxJS Number Creation
 */
export function parseFloat(): OperatorFunction<string, number> {
  return (source: Observable<string>) => source.pipe(map((value) => Number.parseFloat(value)));
}
