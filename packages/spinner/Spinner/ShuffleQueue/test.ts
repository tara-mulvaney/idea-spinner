import { ShuffleQueue } from "./.";
import { expect, test } from "@jest/globals";

test.concurrent("shuffleQueue constructor", async () => {
  expect(() => new ShuffleQueue()).not.toThrow();
});

test.concurrent("shuffleQueue get randomItem", async () => {
  const sq = new ShuffleQueue(["item1"]);

  expect(sq.randomItem).toBe("item1");
});
