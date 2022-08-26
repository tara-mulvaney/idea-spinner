import { createStore } from "vuex";
import { SpinnerParameters } from "@idea-spinner/spinner";
import { createSpinnerModule, SpinnerMutations } from "./spinner";
import { expect, test } from "@jest/globals";

const { SPIN, ADVANCE } = SpinnerMutations;

const createTestSpinnerStore = (parameters: SpinnerParameters) =>
  createStore(createSpinnerModule(parameters));

test.concurrent(`SpinnerStore - ${SPIN}`, async () => {
  const store = createTestSpinnerStore({
    wheels: new Map(),
  });

  store.commit(SPIN, {
    endingFrameLength: 0,
    friction: 0,
    startingFrameLength: 0,
  });

  expect(store.state.spinner.spins.size).toBe(1);
  expect(store.state.isSpinning).toBeTruthy();
});

test.concurrent(`SpinnerStore - ${ADVANCE} requires ${SPIN}`, async () => {
  const store = createTestSpinnerStore({
    wheels: new Map([["wheel1", ["option1"]]]),
  });

  expect(() => store.commit(ADVANCE, 100)).toThrow();
});
