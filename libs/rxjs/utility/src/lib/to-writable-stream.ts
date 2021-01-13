/**
 * @packageDocumentation
 * @module Utility
 */
import { MonoTypeOperatorFunction } from 'rxjs';
import { finalize, switchMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/internal-compatibility';

/**
 * Returns the source Observable, emitting it through the passed
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/WritableStream|WritableStream} and handling the internal
 * subscription state and error handling.
 *
 * @category Streams
 *
 * @param stream The Writer object to emit the data to
 * @param skipCloseWriter Optional By default the operator will close the writer when the subscription ends, set this
 *   to true to disable and provide your own close handler.
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
export function toWritableStream<T extends unknown>(
  stream: WritableStream<T> | WritableStreamDefaultWriter<T>,
  skipCloseWriter = false,
): MonoTypeOperatorFunction<T> {
  // Here we check if there is a getWriter method to support WritableStreamDefaultWriter
  // eslint-disable-next-line
  const writer: WritableStreamDefaultWriter = (stream as any)?.getWriter ? (stream as any).getWriter() : stream;

  let closed = false;

  // Sets up a listener on the closed getter, when fired this sets the closed value to true and fires the writerClosed$
  // subject to ensure the subscription ends
  fromPromise(writer.closed)
    .pipe(tap(() => (closed = true)))
    .subscribe();

  return (source) =>
    source.pipe(
      tap(async (value) => !closed && (await writer.write(value))),
      finalize(async () => {
        if (!closed && !skipCloseWriter) {
          await writer.close();
        }
      }),
      switchMap(() => source),
    );
}
