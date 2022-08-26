import { Spin } from "@idea-spinner/spinner";
import { SpinnerState } from "./spinner";
import { SpinnerWheelProps } from "../views/Spinner";

export interface AppState {
  spinner: SpinnerState;
}

export interface AppGetters {
  currentSpin?: Spin;
  lockedWheelCount: number;
  spinnerWheelProps: SpinnerWheelProps[];
  wheelCount: number;
}
