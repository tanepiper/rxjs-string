import { observe } from 'rxjs-marbles/jest';
import { toWritableStream } from '@rxjs-ninja/rxjs-utility';
import { catchError, reduce, switchMap, take, tap } from 'rxjs/operators';
import { from, of, throwError } from 'rxjs';
import { WritableStream } from 'web-streams-polyfill/ponyfill';

describe('toWritableStream', () => {
  it(
    'should write to a WritableStream passed as parameter',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('12345'),
      });

      return from([1, 2, 3, 4, 5]).pipe(toWritableStream(stream));
    }),
  );

  it(
    'should write to a WritableStreamDefaultWriter passed as parameter',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('12345'),
      });
      const writer = stream.getWriter();

      return from([1, 2, 3, 4, 5]).pipe(toWritableStream(writer));
    }),
  );

  it(
    'should end writing to the writable stream on subscription end',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('123'),
      });
      return from([1, 2, 3, 4, 5]).pipe(take(3), toWritableStream(stream));
    }),
  );

  it(
    'should end writing to the writable stream on error',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('123'),
      });

      return from([1, 2, 3, 4, 5]).pipe(
        switchMap((val) => {
          if (val < 4) {
            return of(val);
          } else {
            return throwError('Number is 4');
          }
        }),
        toWritableStream(stream),
        catchError(() => of(true)),
      );
    }),
  );

  xit(
    'should no longer write when stream is closed',
    observe(() => {
      let output = '';
      const stream = new WritableStream({
        write: (val) => {
          output += val;
        },
        close: () => expect(output).toBe('123'),
      });

      return from([1, 2, 3, 4, 5]).pipe(
        tap(async (val) => {
          if (val === 4) {
            await stream.close();
          }
        }),
        toWritableStream(stream),
        reduce((a, b) => a + b, 0),
        tap((val) => expect(val).toBe(10)),
      );
    }),
  );
});
