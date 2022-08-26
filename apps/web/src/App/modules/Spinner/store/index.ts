import {
  Spinner,
  SpinnerParameters,
  SpinnerPhysics,
  Wheel,
  WheelItem,
} from "@idea-spinner/spinner";

export interface SpinnerStoreState {
  currentSpinID?: string;
  lockedWheelValues: { [wheelName: string]: WheelItem };
  isSpinning: boolean;
  spinner: Spinner;
}

export enum SpinnerStoreMutations {
  SPIN = "spin",
  ADVANCE = "advance",
  LOCK = "lock",
  UNLOCK = "unlock",
}

export const createSpinnerModule = (parameters: SpinnerParameters) => {
  const spinner = new Spinner(parameters);

  return {
    mutations: {
      [SpinnerStoreMutations.SPIN](
        state: SpinnerStoreState,
        physics?: SpinnerPhysics
      ) {
        state.currentSpinID = state.spinner.createSpin(physics).id;
        state.isSpinning = true;
      },
      [SpinnerStoreMutations.ADVANCE](state: SpinnerStoreState, time: number) {
        if (state.currentSpinID === undefined) {
          throw new TypeError(
            "You must SPIN the spinner store before ADVANCEing the spin!"
          );
        }

        state.isSpinning = Boolean(
          state.spinner.advanceSpin(state.currentSpinID, time)?.isSpinning
        );
      },
      [SpinnerStoreMutations.LOCK](state: SpinnerStoreState, wheel: Wheel) {
        state.lockedWheelValues[wheel.name] = wheel.value;
      },
      [SpinnerStoreMutations.UNLOCK](state: SpinnerStoreState, wheel: Wheel) {
        wheel.unsafeForceValue(state.lockedWheelValues[wheel.name]);

        delete state.lockedWheelValues[wheel.name];
      },
    },
    namespaced: true,
    state() {
      return {
        isSpinning: false,
        lockedWheelValues: {},
        spinner,
      };
    },
  };
};
