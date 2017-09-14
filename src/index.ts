import "core-js/modules/es7.symbol.async-iterator";
import * as levelup from 'levelup';

async function* iterable() {
  while (true) {
    const next = await new Promise<any>((r, x) => {
      this.next(function (err, key, value) {
        if (err) x(err);
        r([key, value]);
      });
    });
    if (next[0] === undefined && next[1] === undefined) {
      break;
    }
    yield next;
  }
}

iterable.prototype[Symbol.asyncIterator] = iterable;

levelup.prototype.iterator = function (options) {
  let opts = Object.assign({ keys: true, values: true }, options);
  let iter = this._db.iterator(opts);

  iter[Symbol.asyncIterator] = iterable.bind(iter);

  return iter;
}

declare global {
  namespace Level {
    export interface UP<TKey, TValue, TOptions, TPutOptions, TGetOptions, TDeleteOptions, TIteratorOptions, TBatchOptions> {
      iterator(options?: TIteratorOptions): AsyncIterable<[TKey, TValue]>
    }
  }
}