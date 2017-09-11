# LevelUP Async Iterator 

adds an `iterator` method to the `levelup` prototype that returns a `[Symbol.asyncIterator]` compatible iterator.  

_this is an experimental package_

## Usage

```ts
import 'levelup-async-iterator';
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
```

<a name="open"></a>
### iterator([options])
<code>db.iterator()</code> creates a iterator from the underlying store. the <code>options</code> parameter is the same as what you'd use for createReadStream