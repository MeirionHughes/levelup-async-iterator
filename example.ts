import './src';
import levelup from 'levelup';
import leveldown from 'leveldown';
import encode from 'encoding-down';

let db = levelup(encode(leveldown('./db')));

async function main() {
  await db.put("a", "John");
  await db.put("b", "James");
  await db.put("c", "Janet");
  await db.put("d", "Joseph");

  let iter = db.iterator();

  for await (let {key, value} of iter) {
    if (key === "a") {
      iter.it.seek("c");
    }
    console.log(key, value);
  }
}

main();