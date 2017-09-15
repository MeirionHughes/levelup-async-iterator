import "core-js/modules/es7.symbol.async-iterator";
import '../src';

import * as levelup from 'levelup';
import * as memdown from 'memdown';
import * as encoding from 'encoding-down';
import * as Abstract from 'abstract-leveldown';

import { expect } from 'chai';

describe("LevelUP Async Iterator", () => {
  it("should expose iterator method on levelup instance", () => {
    let up = levelup(memdown("foo"));
    expect(up.iterator).to.not.be.undefined;
  });

  it("should return base iterator", () => {
    let up = levelup(memdown("foo"));
    let iter = up.iterator();

    expect(up.iterator).to.not.be.undefined;
  });

  it("should have [Symbol.asyncIterator] property on iterator", () => {
    let up = levelup(memdown("foo"));
    let iter = up.iterator();

    expect(iter[Symbol.asyncIterator]).to.not.be.undefined;
  });

  it("should be able to for await iterator", async () => {
    let up = levelup(encoding(memdown("foo")));

    await up.put("foo", "bar");
    await up.put("ray", "may");

    let iter = up.iterator();

    let result = [];

    for await (let item of iter) {
      result.push(item);
    }

    expect(result[0]).to.eql(["foo", "bar"]);
    expect(result[1]).to.eql(["ray", "may"]);
  });
});
