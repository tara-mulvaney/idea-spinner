import { AppState } from "./types";
import { SpinnerState } from "./spinner";
import { SpinnerWheelProps } from "../views/Spinner";
import { Spin, WheelItem } from "@idea-spinner/spinner";

const getNoSpinWheelProps = ({
  spinner: {
    parameters: { wheels },
  },
}: SpinnerState): SpinnerWheelProps[] => {
  const result = [];

  for (const [name] of wheels.entries()) {
    result.push({
      isLocked: false,
      isSpinning: false,
      name,
    });
  }

  return result;
};

const getLiveSpinWheelProps = (
  spin: Spin,
  lockedWheelValues: { [wheelName: string]: WheelItem }
): SpinnerWheelProps[] => {
  const result = [];

  for (const [name, { value: rawValue, isSpinning }] of spin.wheels.entries()) {
    let [value, isLocked] = [rawValue, false];

    if (Boolean(lockedWheelValues[name])) {
      isLocked = true;
      value = lockedWheelValues[name];
    }

    if (typeof value === "string") {
      value = { value };
    }

    result.push({
      ...value,
      isLocked,
      isSpinning,
      name,
    });
  }

  return result;
};

export default {
  currentSpin({ spinner: state }: AppState): Spin | undefined {
    return state.spinner.getSpin(state.currentSpinID ?? "");
  },
  lockedWheelCount({ spinner: state }: AppState): number {
    return Object.keys(state.lockedWheelValues).length;
  },
  spinnerWheelProps({ spinner: state }: AppState): SpinnerWheelProps[] {
    if (state.currentSpinID === undefined) {
      return getNoSpinWheelProps(state);
    }

    const currentSpin = state.spinner.getSpin(state.currentSpinID);

    if (!currentSpin) {
      return getNoSpinWheelProps(state);
    }

    return getLiveSpinWheelProps(currentSpin, state.lockedWheelValues);
  },
  wheelCount({ spinner: state }: AppState): number {
    return state.spinner.parameters.wheels.size;
  },
};
