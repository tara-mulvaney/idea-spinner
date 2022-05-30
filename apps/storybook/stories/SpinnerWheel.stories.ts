import SpinnerWheel from "../../web/src/views/Spinner/SpinnerWheel/SpinnerWheel.vue";
import args, { SpinnerWheelProps } from "../../web/src/views/Spinner/SpinnerWheel/props";
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
  template: "<SpinnerWheel v-bind='wheel' />"
});
