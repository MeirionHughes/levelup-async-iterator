import * as levelup from 'levelup';

import { LevelAsyncIterable } from './_level-async-iterator';

function iterator<K=any, V=any, TGetOptions=any>
  (options?: TGetOptions): LevelAsyncIterable<K, V> {
  let opts = Object.assign({ keys: true, values: true }, options);

  let iter = this._db.iterator(opts);

  return new _LevelAsyncIterator(iter);
}

class _LevelAsyncIterator<K, V> implements LevelAsyncIterable<K, V> {
  private _ended = false;
  constructor(private _iter: any) {
  }
  async *[Symbol.asyncIterator]() {
    if (this._ended === true) throw Error("iterator has already ended");

    while (true) {

      const next = await new Promise<any>((r, x) => {
        this._iter.next(function (err, key, value) {
          if (err) x(err);
          r([key, value]);
        });
      });
      if (next[0] === undefined && next[1] === undefined) {
        this._ended = true;
        break;
      }
      yield next;
    }
  }
  end() {
    return new Promise<void>(r => {
      this._iter.end(r);
      this._ended = true;
    });
  }
}

export default iterator;

