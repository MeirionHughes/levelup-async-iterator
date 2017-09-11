export interface LevelAsyncIterable<K,V> extends AsyncIterable<[K, V]> {
  end(): Promise<void>
}