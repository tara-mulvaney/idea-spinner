import {
  createSpinnerStore,
  SpinnerStoreGetters,
  SpinnerStoreMutations
} from ".";
import { expect, test } from "@jest/globals";

test.concurrent(`SpinnerStoreMutations - ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map()
    });

    store.commit(SpinnerStoreMutations.SPIN, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0
    });

    expect(store.state.spinner.spins.size).toBe(1);
    expect(store.state.isSpinning).toBeTruthy();
  }
);

test.concurrent(`SpinnerStoreMutations - ${SpinnerStoreMutations.ADVANCE}`,
  async () => {
    const store = createSpinnerStore({
      defaultPhysics: {
        endingFrameLength: 1000,
        friction: 1,
        startingFrameLength: 100
      },
      wheels: new Map([["wheel1", ["option1"]]])
    });

    store.commit(SpinnerStoreMutations.SPIN);
    store.commit(SpinnerStoreMutations.ADVANCE, 100);

    expect(
      (store.getters as SpinnerStoreGetters).spinnerDisplay
    ).toHaveLength(1);
  }
);

test.concurrent(
  `SpinnerStoreMutations - ${SpinnerStoreMutations.ADVANCE
  } requires ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const store = createSpinnerStore({
      wheels: new Map([["wheel1", ["option1"]]])
    });

    expect(
      () => store.commit(SpinnerStoreMutations.ADVANCE, 100)
    ).toThrow();
  }
);
