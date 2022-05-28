import props from "./props";
import { shallowMount } from "@vue/test-utils";
import SpinnerWheel from "./SpinnerWheel.vue";

test.concurrent("spinner wheel - snapshot", async () => {
  const { element } = shallowMount(SpinnerWheel, { props });

  expect(element).toMatchSnapshot();
});
