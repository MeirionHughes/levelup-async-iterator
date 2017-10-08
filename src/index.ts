import levelup from 'levelup';
import iterator from './iterator';
import {AbstractIterator, AbstractIteratorOptions} from 'abstract-leveldown';

if (Symbol.asyncIterator === undefined) {
  throw Error("this system does not support async-iteration");
}

levelup.prototype.iterator = function (options) {
  let opts = Object.assign({ keys: true, values: true }, options);
  let iter = this._db.iterator(opts)

  if (iter[Symbol.asyncIterator] === undefined) {
    iter[Symbol.asyncIterator] = function () {
      return iterator(iter)[Symbol.asyncIterator]();
    }
  }
  
  return iter;
}

declare global {
  namespace Level {
    export interface UP<K, V, O, PO, GO, DO, IO, BO, TB> {
      iterator(options?: IO & AbstractIteratorOptions<K>): AsyncIterable<{ key: K, value: V }> & AbstractIterator<K, V>
    }
  }
}