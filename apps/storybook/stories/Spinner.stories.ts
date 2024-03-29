import args from "../../web/src/components/Spinner/props";
import { Spinner, SpinnerProps } from "../../web/src/components/Spinner";

import parameters from "@idea-spinner/storybook/hideDocsTab";

export default {
  args,
  argTypes: {
    handleSpin: {
      action: "spin"
    }
  },
  component: Spinner,
  title: "Components/Spinner",
  parameters
};

export const Example = ({
  hasSpun,
  isSpinning,
  maxColumns,
  wheels,
  handleSpin
}: SpinnerProps & { handleSpin: () => void; }) => ({
  components: { Spinner },
  setup() {
    return { handleSpin, isSpinning, hasSpun, maxColumns, wheels };
  },
  template: `
    <div style="width: 100vw; height: 100vh; max-width: 1080px; max-height: 320px;">
      <Spinner
        :wheels="wheels" 
        :is-spinning="isSpinning"
        :has-spun="hasSpun"
        :max-columns="maxColumns" 
        @spin='handleSpin'
      />
    </div>
  `
});
