/**
 * @packageDocumentation
 * @module Array
 */
import { isObservable, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

/**
 * Returns an Observable Array containing unique values that are not in the provided input Array or Set
 *
 * @category Compare
 *
 * @see [[filterDifference]] operator for an Array containing potential duplicate differences
 *
 * @typeParam T Item type contained in the Array/Set
 *
 * @param input Array/Set or Observable value to compare against for the difference
 *
 * @example
 * Returns the difference between the source array and the passed static array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(['a', 'c'])).subscribe();
 * ```
 * Output: `['b', 'd']`
 *
 * @example
 * Returns the difference between the source array and the passed Observable array
 * ```ts
 * const input = ['a', 'b', 'd', 'a', 'b'];
 * of(input).pipe(difference(of(['a', 'c']))).subscribe();
 * ```
 * Output: `['b', 'd']`
 *
 * @returns An Observable that emits an Array containing a subset of the source value
 */
export function difference<T extends unknown>(
  input: T[] | Set<T> | ObservableInput<T[] | Set<T>>,
): OperatorFunction<T[] | Set<T>, T[]> {
  return (source) =>
    ((isObservable(input) ? input : of(input)) as Observable<T[] | Set<T>>).pipe(
      map((val) => new Set(val)),
      switchMap((inputValue: Set<T>) =>
        source.pipe(
          map((value) => {
            return [...new Set<T>(value)].filter((x) => !inputValue.has(x));
          }),
        ),
      ),
    );
}
