import './src';
import * as levelup from 'levelup';
import * as leveldown from 'leveldown';
import * as encode from 'encoding-down';
import * as Abstract from 'abstract-leveldown';
import {linq} from 'pipeline-linq';

type Options = leveldown.LevelDownOptions & encode.EncodingOptions;

let opts = {
  createIfMissing: true
}

let down = leveldown<string>('./db');
let db = levelup(encode(down), opts);

async function main() {
  await db.put("a", "John");
  await db.put("b", "Doe");

  let iter = db.iterator();
  let query = await linq(iter);

  console.log(query);
}

main();