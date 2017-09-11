import "core-js/modules/es7.symbol.async-iterator";
import * as levelup from 'levelup';
import iterator from './iterator';
import { LevelAsyncIterable } from './_level-async-iterator';

levelup.prototype.iterator = iterator;

declare global {
  namespace Level {
    export interface UP<TKey, TValue, TOptions, TPutOptions, TGetOptions, TDeleteOptions, TBatchOptions, TIteratorOptions> {
      iterator(options?: TIteratorOptions): LevelAsyncIterable<TKey, TValue>
    }
  }
}

export * from './_level-async-iterator';