export default async function* iterable() {
  while (true) {
    const next = await new Promise<any>((r, x) => {
      this.next(function (err, key, value) {
        if (err) x(err);
        r([key, value]);
      });
    });
    if (next[0] === undefined && next[1] === undefined) {
      break;
    }
    yield next;
  }
}
