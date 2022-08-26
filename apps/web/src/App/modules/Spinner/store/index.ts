import {
  Spinner,
  SpinnerParameters,
  SpinnerPhysics,
  Wheel,
  WheelItem,
} from "@idea-spinner/spinner";

export interface SpinnerState {
  currentSpinID?: string;
  lockedWheelValues: { [wheelName: string]: WheelItem };
  isSpinning: boolean;
  spinner: Spinner;
}

export enum SpinnerMutations {
  SPIN = "spin",
  ADVANCE = "advance",
  LOCK = "lock",
  UNLOCK = "unlock",
}

export const createSpinnerModule = (parameters: SpinnerParameters) => {
  const spinner = new Spinner(parameters);

  return {
    mutations: {
      [SpinnerMutations.SPIN](state: SpinnerState, physics?: SpinnerPhysics) {
        state.currentSpinID = state.spinner.createSpin(physics).id;
        state.isSpinning = true;
      },
      [SpinnerMutations.ADVANCE](state: SpinnerState, time: number) {
        if (state.currentSpinID === undefined) {
          throw new TypeError(
            "You must SPIN the spinner store before ADVANCEing the spin!"
          );
        }

        state.isSpinning = Boolean(
          state.spinner.advanceSpin(state.currentSpinID, time)?.isSpinning
        );
      },
      [SpinnerMutations.LOCK](state: SpinnerState, wheel: Wheel) {
        state.lockedWheelValues[wheel.name] = wheel.value;
      },
      [SpinnerMutations.UNLOCK](state: SpinnerState, wheel: Wheel) {
        // ISSUE #39: remove unsafeForceValue and the "persist force spin stop"
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
