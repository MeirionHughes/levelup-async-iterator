import "core-js/modules/es7.symbol.async-iterator";
import * as levelup from 'levelup';
import * as Abstract from 'abstract-leveldown';

import iterator from './iterator';

levelup.prototype.iterator = function (options) {
  let opts = Object.assign({ keys: true, values: true }, options);
  let iter = this._db.iterator(opts);

  iter[Symbol.asyncIterator] = iterator.bind(iter);

  return iter;
}

declare global {
  namespace Level {
    export interface UP<TKey, TValue, TOptions, TPutOptions, TGetOptions, TDeleteOptions, TIteratorOptions, TBatchOptions> {
      iterator(options?: TIteratorOptions): AsyncIterable<[TKey, TValue]> & Abstract.Iterator
    }
  }
}