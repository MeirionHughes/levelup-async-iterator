import './src';
import * as levelup from 'levelup';
import * as leveldown from 'leveldown';
import * as encode from 'encoding-down';

let db = levelup(encode(leveldown('./db')));

async function main() {
  await db.put("hello", "world");

  let iter = db.iterator();

  for await (let [key, value] of iter) {
    console.log(key, value);
  }
}

main();