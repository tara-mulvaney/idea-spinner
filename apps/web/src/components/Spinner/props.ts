import type { SpinnerWheelProps } from "../SpinnerWheel";

export interface SpinnerProps {
  hasSpun: boolean;
  isLocked: boolean;
  isSpinning: boolean;
  maxColumns?: number;
  wheels: SpinnerWheelProps[];
}

export default {
  hasSpun: false,
  isLocked: false,
  isSpinning: false,
  maxColumns: 4,
  wheels: [
    {
      isLocked: false,
      isSpinning: true,
      name: "color",
      value: "red",
    },
    {
      isLocked: false,
      isSpinning: true,
      name: "shape",
      value: "round",
    },
    {
      isLocked: false,
      isSpinning: false,
      name: "feeling",
      value: "sad",
    },
  ],
} as SpinnerProps;
