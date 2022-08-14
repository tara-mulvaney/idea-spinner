import props from "./props";
import SpinnerWheel from "./SpinnerWheel.vue";
import { expect, test } from "@jest/globals";
import { mount, shallowMount } from "@vue/test-utils";

test.concurrent("spinner wheel - snapshot", async () => {
  const { element } = shallowMount(SpinnerWheel, { props });

  expect(element).toMatchSnapshot();
});

const TOP = ".SpinnerWheel";
const LOCK = ".SpinnerWheel__lock";
const VALUE_INPUT = ".SpinnerWheel__valueInput";

test.concurrent(`spinner wheel - ${LOCK}`, async () => {
  const wrapper = mount(SpinnerWheel, { props });

  await wrapper.find(LOCK).trigger("click");

  expect(wrapper.emitted()).toHaveProperty("lock");
  expect(wrapper.emitted()).not.toHaveProperty("unlock");
});

test.concurrent(`spinner wheel - ${TOP} Enter`, async () => {
  const wrapper = mount(SpinnerWheel, { props });

  await wrapper.find(TOP).trigger("keydown", { key: "Enter" });

  expect(wrapper.emitted()).toHaveProperty("lock");
  expect(wrapper.emitted()).not.toHaveProperty("unlock");
});

test.concurrent(
  `spinner wheel - ${LOCK} shouldn't toggle while spinning`,
  async () => {
    const wrapper = mount(SpinnerWheel, {
      props: { ...props, isSpinning: true },
    });

    await wrapper.find(LOCK).trigger("click");

    expect(wrapper.emitted()).not.toHaveProperty("lock");
  }
);

test.concurrent(
  `spinner wheel - tabbing from ${TOP} shouldn't change state`,
  async () => {
    const wrapper = mount(SpinnerWheel, { props });

    await wrapper.find(TOP).trigger("keydown", { key: "Tab" });

    expect(wrapper.emitted()).not.toHaveProperty("lock");
    expect(wrapper.emitted()).not.toHaveProperty("edit");
  }
);

test.concurrent(`spinner wheel - change ${VALUE_INPUT}`, async () => {
  const wrapper = mount(SpinnerWheel, { props });

  await wrapper.find(VALUE_INPUT).trigger("input");

  expect(wrapper.emitted()).toHaveProperty("edit");
});

test.concurrent(
  `spinner wheel - change ${VALUE_INPUT} from top-level ${TOP}`,
  async () => {
    const wrapper = mount(SpinnerWheel, { props });

    await wrapper.find(TOP).trigger("keydown", { keyCode: 65 });

    expect(wrapper.emitted()).toHaveProperty("edit");
  }
);
