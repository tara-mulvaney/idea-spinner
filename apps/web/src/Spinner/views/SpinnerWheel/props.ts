export interface SpinnerWheelProps {
  description?: string;
  isSpinning: boolean;
  name: string;
  tickDuration: string;
  value?: string;
}

export default {
  description:
    "Clowns are a curious breed who sustain themselves " +
    "on the laugher of children.",
  isSpinning: false,
  name: "Demo Wheel",
  tickDuration: "200ms",
  value: "Clowns"
} as SpinnerWheelProps;
