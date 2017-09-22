// issue #1 #2
// https://github.com/Microsoft/TypeScript/issues/14151#issuecomment-280812617
(<any>Symbol).asyncIterator = Symbol.asyncIterator || Symbol.for('Symbol.asyncIterator')

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
