import { Spin } from "@idea-spinner/spinner";
import { SpinnerState, SpinnerWheelProps } from "../modules/Spinner";

export interface AppState {
  spinner: SpinnerState;
}

export interface AppGetters {
  currentSpin?: Spin;
  lockedWheelCount: number;
  spinnerWheelProps: SpinnerWheelProps[];
  wheelCount: number;
}
