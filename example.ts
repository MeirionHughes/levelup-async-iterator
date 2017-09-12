import './src';
import * as levelup from 'levelup';
import * as leveldown from 'leveldown';
import * as encode from 'encoding-down';
import * as Abstract from 'abstract-leveldown';

type CustomDown = Abstract.LevelDOWN<string, any, any, any, any, any, { lte: string },any >

let store = encode(leveldown('./db')) as CustomDown;

let db = levelup(store);

async function main() {
  await db.put("hello", "world", );

  let iter = db.iterator({}); // lte required in typing^

  for await (let [key, value] of iter) {


    console.log(key, value);
  }
}

main();