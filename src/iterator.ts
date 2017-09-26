import terminator from '@async-generators/terminator';

export default function (it) {
  return terminator(iterable(it));
}

const $_terminated = Symbol.for("terminated");

async function* iterable(it) {
  while (true) {
    const next = await new Promise<any>((r, x) => {
      it.next(function (err, key, value) {
        if (arguments.length === 0) r(undefined);
        if (err === null && key === undefined && value === undefined) r(undefined);
        if (err) x(err);
        r({ key: key, value: value });
      });
    });
    if (next === undefined) { break; }
    if ((yield next) === $_terminated) { 
      await new Promise<any>((r, x) => it.end((e) => (e ? x(x) : r())));
      return;
    }
  }
}