# LevelUP Async Iterator 

<img alt="LevelDB Logo" height="100" src="http://leveldb.org/img/logo.svg">

adds `iterator()` to `levelup` that returns `this._db.iterator(options)` plus an injected `[Symbol.asyncIterator]` property

## Usage

_this package **requires** that the host system support async-iteration. Currently for node 8.x, this requires running your application with:_ 

```
node --harmony_async_iteration example.js
``` 

import/require `levelup-async-iterator` on app entry; 

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

output: 
```
D:\Code\levelup-async-iterator>ts-node example
a John
c Janet
d Joseph
```

<a name="open"></a>
### iterator([options])
<code>db.iterator()</code> creates a iterator from the underlying store. the <code>options</code> parameter is the same as what you'd use for createReadStream