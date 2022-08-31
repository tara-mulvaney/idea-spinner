import { expect, test } from "@jest/globals";
import { Spin, Spinner, Wheel } from ".";

test.concurrent("Spinner - constructor", async () => {
  expect(
    () =>
      new Spinner({
        wheels: new Map([["wheel1", ["a", "b", "c"]]]),
      })
  ).not.toThrow();
});

test.concurrent("Spinner - createSpin", async () => {
  const spinner = new Spinner({
    wheels: new Map([["wheel1", ["a", "b", "c"]]]),
  });

  const startingFrameLength = 100;
  const spinID = spinner.createSpin({
    endingFrameLength: 300,
    friction: 0.5,
    startingFrameLength,
    variance: 1,
  }).id;

  const item1 = spinner.getSpin(spinID)?.wheels.get("wheel1")?.value;

  expect(item1).toBeTruthy();
});

test.concurrent(
  "Spinner - fails createSpin if no physics provided",
  async () => {
    const spinner = new Spinner({
      wheels: new Map([["wheel1", ["a", "b", "c"]]]),
    });

    expect(() => spinner.createSpin()).toThrow();
  }
);

test.concurrent("Spinner - advanceSpin", async () => {
  const spinner = new Spinner({
    wheels: new Map([["wheel1", ["a", "b", "c"]]]),
  });

  const startingFrameLength = 100;
  const spinID = spinner.createSpin({
    endingFrameLength: 300,
    friction: 0.5,
    startingFrameLength,
    variance: 1,
  }).id;

  const item1 = spinner.getSpin(spinID)?.wheels.get("wheel1")?.value;

  spinner.advanceSpin(spinID, startingFrameLength * 2);

  const item2 = spinner.getSpin(spinID)?.wheels.get("wheel1")?.value;

  expect(item2).not.toEqual(item1);
});

test.concurrent("Spinner - stopSpin", async () => {
  const spinner = new Spinner({
    wheels: new Map([["wheel1", ["a", "b", "c"]]]),
  });

  const startingFrameLength = 100;
  const spin = spinner.createSpin({
    endingFrameLength: 300,
    friction: 0.5,
    startingFrameLength,
    variance: 1,
  });

  spinner.stopSpin(spin.id);

  expect(spin.isSpinning).toBe(false);
});

test.concurrent("Spinner - does nothing on missing spin ID", async () => {
  const spinner = new Spinner({
    wheels: new Map([["wheel1", ["a", "b", "c"]]]),
  });

  expect(spinner.advanceSpin("blahhh", 10)).toBeFalsy();
  expect(spinner.stopSpin("boop")).toBeFalsy();
});

test.concurrent("Spin - isSpinning", async () => {
  const spin = new Spin({
    id: "spin1",
    physics: {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 1,
    },
    wheels: new Map([["wheel1", ["1", "2"]]]),
  });

  expect(spin.isSpinning).toBe(false);
});

test.concurrent(
  "Wheel - short circuits advancement if not spinning",
  async () => {
    const wheel = new Wheel({
      items: ["item1", "item2"],
      name: "wheel1",
      physics: {
        endingFrameLength: 0,
        friction: 0,
        startingFrameLength: 1,
      },
    });

    const initialValue = wheel.value;

    expect(wheel.isSpinning).toBe(false);

    wheel.advanceTime(100);

    expect(initialValue).toBe(wheel.value);

    wheel.advanceTime(1000);

    expect(initialValue).toBe(wheel.value);

    wheel.advanceTime(10000);

    expect(initialValue).toBe(wheel.value);
  }
);
