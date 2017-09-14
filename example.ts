import './src';
import * as levelup from 'levelup';
import * as leveldown from 'leveldown';
import * as encode from 'encoding-down';
import * as Abstract from 'abstract-leveldown';
import { linq } from 'pipeline-linq';

type Options = leveldown.LevelDownOptions;

let opts: Options = {
  createIfMissing: true,
}

let down = leveldown('./db');
let db = levelup(encode(down), opts);

async function main() {
  await db.put("a", "John");
  await db.put("b", "Doe");

  let iter = db.iterator();

  for await (let item of iter) {
    console.log(item);
  }
}

main();