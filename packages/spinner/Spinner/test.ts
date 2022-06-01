import { Spinner } from ".";
import { expect, test } from "@jest/globals";


test.concurrent("spinner constructor", async () => {
  expect(() => new Spinner({
    wheels: new Map([
      ["wheel1", ["a", "b", "c"]]
    ])
  })).not.toThrow();
});

test.concurrent("spinner spin", async () => {
  const spinner = new Spinner({
    wheels: new Map([
      ["wheel1", ["a", "b", "c"]]
    ])
  });

  const startingFrameLength = 100;
  const spinID = spinner.createSpin({
    endingFrameLength: 300,
    friction: 0.5,
    startingFrameLength,
    variance: 1
  });

  const item1 = spinner.getSpin(spinID)?.wheels.get("wheel1");

  expect(item1).toBeTruthy();
});

