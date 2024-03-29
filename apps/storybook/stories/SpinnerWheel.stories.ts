import args from "../../web/src/components/SpinnerWheel/props";
import { SpinnerWheel, SpinnerWheelProps } from "../../web/src/components/SpinnerWheel";
import parameters from "../hideDocsTab";

export default {
  args,
  component: SpinnerWheel,
  title: "Components/Spinner Wheel",
  parameters
};

export const Example = (wheel: SpinnerWheelProps) => ({
  components: { SpinnerWheel },
  setup() {
    return { wheel };
  },
  template: `
    <div style="width: 100vw; height: 100vh; max-width: 780px; max-height: 320px;">
      <SpinnerWheel v-bind='wheel' />
    </div>
  `
});
