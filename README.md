# LevelUP Async Iterator 

adds `iterator()` to `levelup` that returns a `this._db.iterator(options)` plus an injected `[Symbol.asyncIterator]` property

_this is an experimental package_

## Usage

```ts
import 'levelup-async-iterator';
import * as levelup from 'levelup';
import * as leveldown from 'leveldown';
import * as encode from 'encoding-down';

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
```

<a name="open"></a>
### iterator([options])
<code>db.iterator()</code> creates a iterator from the underlying store. the <code>options</code> parameter is the same as what you'd use for createReadStream