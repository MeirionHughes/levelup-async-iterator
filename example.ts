import './src';
import * as levelup from 'levelup';
import * as leveldown from 'leveldown';
import * as encode from 'encoding-down';
import * as Abstract from 'abstract-leveldown';
import { linq } from 'pipeline-linq';

let db = levelup(encode(leveldown('./db')));

async function main() {
  await db.put("a", "John");
  await db.put("b", "James");
  await db.put("c", "Janet");
  await db.put("d", "Joseph");

  let iter = db.iterator();  

  for await (let [key, value] of iter) {
    if(key === "a"){
      iter.it.seek("c");
    }
    console.log(key, value);
  }
}

main();