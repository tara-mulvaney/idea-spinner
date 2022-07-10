export interface SpinnerWheelProps {
  description?: string;
  isSpinning: boolean;
  name: string;
  value?: string;
}

export default {
  description:
    "Clowns are a curious breed who sustain themselves " +
    "on the laugher of children.",
  isSpinning: false,
  name: "Demo Wheel",
  value: "Clowns"
} as SpinnerWheelProps;
