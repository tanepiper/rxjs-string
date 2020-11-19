/**
 * @packageDocumentation
 * @module random
 */
import { Observable, Subscriber, timer } from 'rxjs';
import { finalize, map, takeWhile, tap } from 'rxjs/operators';

/**
 * An Observable string value generator that generates random numbers
 * @param min
 * @param max
 * @param emitDelay
 */
export function fromRandom(min = 0, max = 1, emitDelay = 0) {
  return new Observable((subscriber: Subscriber<number>) => {
    timer(0, emitDelay)
      .pipe(
        takeWhile(() => !subscriber.closed),
        map((value) => Math.random() * (max - min) + min),
        tap((value) => subscriber.next(value)),
        finalize(() => subscriber.complete()),
      )
      .subscribe();
  });
}