import { Spinner } from ".";
import { expect, test } from "@jest/globals";

const sleep =
  async (time: number) => new Promise((resolve) => setTimeout(resolve, time));

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
  const spinID = spinner.spin({
    endingFrameLength: 300,
    friction: 0.5,
    startingFrameLength
  });

  const item1 = spinner.getSpinStatus(spinID)?.wheel1;

  expect(item1).toBeTruthy();

  await sleep(startingFrameLength * 2);

  const item2 = spinner.getSpinStatus(spinID)?.wheel1;

  expect(item2).not.toEqual(item1);

  expect(
    spinner.getSpinStatus(spinID, startingFrameLength * 3)
  ).not.toEqual(item1);

  expect(
    spinner.getSpinStatus(spinID, startingFrameLength * 3)
  ).not.toEqual(item2);
});

test.concurrent("spinner empty spinID", async () => {
  const spinner = new Spinner({
    wheels: new Map()
  });

  expect(spinner.getSpinStatus("")).toBeFalsy();
});
