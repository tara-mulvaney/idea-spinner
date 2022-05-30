import props from "./props";
import { shallowMount } from "@vue/test-utils";
import Spinner from "./Spinner.vue";
import { expect, test } from "@jest/globals";

test.concurrent("spinner - snapshot", async () => {
  const { element } = shallowMount(Spinner, { props });

  expect(element).toMatchSnapshot();
});

test.concurrent("spinner - spinning", async () => {
  const { element } = shallowMount(Spinner, {
    props: { ...props, isSpinning: true }
  });

  expect(element).toMatchSnapshot();
});
