import {
  Spinner,
  SpinnerParameters,
  SpinnerPhysics,
  Wheel,
  WheelItem,
} from "@idea-spinner/spinner";

export interface WheelOverride<T = WheelItem> {
  isLocked: boolean;
  value: T;
}

export interface SpinnerState {
  currentSpinID?: string;
  wheelOverrides: { [wheelName: string]: WheelOverride };
  isSpinning: boolean;
  spinner: Spinner;
}

export enum SpinnerMutations {
  SPIN = "spin",
  ADVANCE = "advance",
  OVERRIDE = "override",
  STOP = "stop",
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
      [SpinnerMutations.OVERRIDE](
        state: SpinnerState,
        mutationParameters: {
          wheel: Wheel;
          override: WheelOverride;
        }
      ) {
        state.wheelOverrides[mutationParameters.wheel.name] =
          mutationParameters.override;
      },
      [SpinnerMutations.STOP](state: SpinnerState) {
        if (state.currentSpinID === undefined) {
          throw new TypeError(
            "You must SPIN the spinner store before you can STOP it!"
          );
        }

        state.spinner.stopSpin(state.currentSpinID);
        state.isSpinning = false;
      },
    },
    namespaced: true,
    state() {
      return {
        isSpinning: false,
        spinner,
        wheelOverrides: {},
      };
    },
  };
};
