/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';

/**
 * Returns the source Observable, emitting it through the passed
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WritableStream|WritableStream} source, with error
 * and subscription end handing
 *
 * @category Streams
 *
 * @param stream The writable stream to emit to
 *
 * @example Write an array of Observable values to a `WritableStream`
 * ```ts
 * let result = ''
 * const stream = new WritableStream({
 *   write: (chunk) => result += chunk,
 *   close: () => console.log(result)
 * });
 *
 * const input = ['Hello', ' ', 'RxJS', ' ', 'Ninja'];
 * from(input).pipe(toWritableStream(stream)).subscribe();
 * ```
 * Output: `Hello RxJS Ninja`
 *
 * @returns Observable that emits the source observable after performing a write to the WritableStream
 */
export function toWritableStream<T extends unknown>(stream: WritableStream<T>): MonoTypeOperatorFunction<T> {
  const writer = stream.getWriter();

  return (source) =>
    source.pipe(
      tap((value) => writer.write(value)),
      catchError((error) => {
        writer.abort(error);
        return throwError(error);
      }),
      finalize(() => writer.close()),
      switchMap(() => source),
    );
}
