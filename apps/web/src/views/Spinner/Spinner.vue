<script lang="ts" setup>
import { ref } from "vue";
import { SpinnerWheel, SpinnerWheelProps } from "./SpinnerWheel";

// see: https://github.com/vuejs/core/issues/4294
interface SpinnerProps {
  isSpinning: boolean;
  maxColumns: number;
  wheels: SpinnerWheelProps[];
}

const props = withDefaults(defineProps<SpinnerProps>(), { maxColumns: 4 });

const rowCount = ref(Math.ceil(props.wheels.length / props.maxColumns));
const leverText = ref(props.isSpinning ? "Spinning..." : "Click to Spin!");

defineEmits(["spin"]);
</script>

<template>
  <article class="Spinner">
    <ul class="SpinnerWheels">
      <SpinnerWheel v-for="wheel in wheels" :key="wheel.name" v-bind="wheel" />
    </ul>

    <button class="SpinnerLever" @click.prevent="$emit('spin', true)"
      :disabled="isSpinning">
      {{ leverText }}
    </button>
  </article>
</template>

<style scoped>
* {
  all: initial;
}

.Spinner {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: var(--gutter-standard);
  height: 100%;
  max-width: var(--max-supported-width);
  min-width: var(--min-supported-width);
  width: 100%;
}

.SpinnerWheels {
  display: grid;
  flex-grow: 1;
  grid-auto-flow: column;
  grid-gap: var(--gutter-standard);
  grid-template-rows: repeat(v-bind(rowCount), auto);
  width: 100%;
}

.SpinnerLever {
  background: var(--color-primary-variant);
  border-radius: calc(var(--gutter-standard) / 2);
  color: var(--color-primary-variant-foreground);
  cursor: pointer;
  font-size: var(--gutter-wide);
  padding: var(--gutter-narrow) var(--gutter-wide);
  text-align: center;
}

.SpinnerLever[disabled] {
  background: var(--color-primary-foreground);
  cursor: not-allowed;
}
</style>
