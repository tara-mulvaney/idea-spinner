import { Spinner } from "@idea-spinner/spinner";
import { expect, test } from "@jest/globals";
import { SpinnerStore, SpinnerStoreMutations, SpinnerStoreState } from ".";

test.concurrent(`SpinnerStoreMutations - ${SpinnerStoreMutations.INITIALIZE}`,
  async () => {
    const state: SpinnerStoreState = {
      display: [],
      isSpinning: false
    };

    SpinnerStore.mutations[SpinnerStoreMutations.INITIALIZE](state, new Map([[
      "wheel1", ["a"]
    ]]));

    expect(state.spinner).toBeTruthy();
  }
);

test.concurrent(`SpinnerStoreMutations - ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const state: SpinnerStoreState = {
      display: [],
      isSpinning: false,
      spinner: new Spinner({
        wheels: new Map()
      })
    };

    SpinnerStore.mutations[SpinnerStoreMutations.SPIN](state, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0
    });

    expect(state.spinner?.spins.size).toBe(1);
    expect(state.isSpinning).toBeTruthy();
  }
);

test.concurrent(
  `SpinnerStoreMutations - ${SpinnerStoreMutations.SPIN
  } requires ${SpinnerStoreMutations.INITIALIZE}`,
  async () => {
    const state: SpinnerStoreState = {
      display: [],
      isSpinning: false,
    };

    expect(() => SpinnerStore.mutations[SpinnerStoreMutations.SPIN](state, {
      endingFrameLength: 0,
      friction: 0,
      startingFrameLength: 0
    })).toThrow();
  }
);

test.concurrent(`SpinnerStoreMutations - ${SpinnerStoreMutations.ADVANCE}`,
  async () => {
    const spinner = new Spinner({
      wheels: new Map([[
        "wheel1", ["option1"]
      ]])
    });

    const currentSpinID = spinner.createSpin({
      endingFrameLength: 1000,
      friction: 1,
      startingFrameLength: 100
    });

    const state = {
      currentSpinID,
      display: [],
      isSpinning: true,
      spinner,
    };

    SpinnerStore.mutations[SpinnerStoreMutations.ADVANCE](state, 100);

    expect(state.display).toHaveLength(1);
  }
);

test.concurrent(
  `SpinnerStoreMutations - ${SpinnerStoreMutations.ADVANCE
  } requires ${SpinnerStoreMutations.INITIALIZE}`,
  async () => {
    const state: SpinnerStoreState = {
      display: [],
      isSpinning: false,
    };

    expect(
      () => SpinnerStore.mutations[
        SpinnerStoreMutations.ADVANCE
      ](state, 100)
    ).toThrow();
  }
);

test.concurrent(
  `SpinnerStoreMutations - ${SpinnerStoreMutations.ADVANCE
  } requires ${SpinnerStoreMutations.SPIN}`,
  async () => {
    const state: SpinnerStoreState = {
      display: [],
      isSpinning: true,
      spinner: new Spinner({
        wheels: new Map()
      })
    };

    expect(
      () => SpinnerStore.mutations[
        SpinnerStoreMutations.ADVANCE
      ](state, 100)
    ).toThrow();
  }
);

test.concurrent(
  `SpinnerStoreMutations - ${SpinnerStoreMutations.ADVANCE
  } requires valid currentSpinnerID`,
  async () => {
    const state: SpinnerStoreState = {
      currentSpinID: "MISSING",
      display: [],
      isSpinning: true,
      spinner: new Spinner({
        wheels: new Map()
      }),
    };

    expect(
      () => SpinnerStore.mutations[
        SpinnerStoreMutations.ADVANCE
      ](state, 100)
    ).toThrow();
  }
);
