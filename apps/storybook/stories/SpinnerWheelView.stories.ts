import SpinnerWheel from "../../web/src/Spinner/views/SpinnerWheel/SpinnerWheel.vue";
import args, { SpinnerWheelProps } from "../../web/src/Spinner/views/SpinnerWheel/props";
import parameters from "../hideDocsTab";

export default {
  args,
  component: SpinnerWheel,
  title: "Views/Spinner/Spinner Wheel",
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
