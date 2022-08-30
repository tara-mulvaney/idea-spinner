<script lang="ts" setup>
  import { ref } from "vue";
  import { SpinnerWheel, SpinnerWheelProps } from "../SpinnerWheel";

  // see: https://github.com/vuejs/core/issues/4294
  interface SpinnerProps {
    hasSpun: boolean;
    isLocked: boolean;
    isSpinning: boolean;
    maxColumns?: number;
    wheels: SpinnerWheelProps[];
  }

  const props = withDefaults(defineProps<SpinnerProps>(), { maxColumns: 4 });

  const rowCount = ref(Math.ceil(props.wheels.length / props.maxColumns));

  defineEmits(["start-spin", "edit-wheel", "lock-wheel", "unlock-wheel"]);
</script>

<template>
  <article class="Spinner">
    <ul
      :class="{
        SpinnerWheels: true,
        'SpinnerWheels--waiting': !hasSpun,
      }"
    >
      <SpinnerWheel
        v-for="wheel in wheels"
        :key="wheel.name"
        v-bind="wheel"
        @edit="
          hasSpun && $emit('edit-wheel', { ...$event, wheelName: wheel.name })
        "
        @lock="hasSpun && $emit('lock-wheel', wheel.name)"
        @unlock="hasSpun && $emit('unlock-wheel', wheel.name)"
      />
    </ul>

    <button
      class="SpinnerLever"
      :disabled="isSpinning || isLocked"
      @click.prevent="$emit('start-spin', true)"
      @keydown.enter="$emit('start-spin', true)"
    >
      {{ isSpinning ? "Spinning..." : isLocked ? "Locked." : "Click to Spin!" }}
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
    width: 100%;
  }

  .SpinnerWheels {
    display: grid;
    flex-grow: 1;
    grid-auto-flow: column;
    grid-gap: var(--gutter-standard);
    grid-template-rows: repeat(v-bind(rowCount), auto);
    opacity: 1;
    transition: opacity var(--animation-timing) ease-out;
    width: 100%;
  }

  .SpinnerWheels--waiting {
    opacity: 0.5;
  }

  .SpinnerLever {
    background: var(--color-primary-variant);
    border-radius: calc(var(--gutter-standard) / 2);
    color: var(--color-primary-variant-foreground);
    cursor: pointer;
    font-family: var(--font-primary);
    font-size: var(--gutter-large);
    padding: var(--gutter-narrow) var(--gutter-wide);
    text-align: center;
  }

  .SpinnerLever[disabled] {
    background: var(--color-primary-foreground);
    cursor: not-allowed;
  }

  .SpinnerLever:focus {
    outline: 3px solid var(--color-primary-variant);
    outline-offset: 2px;
  }

  @media screen and (max-width: 760px) {
    .SpinnerWheels {
      grid-auto-flow: row;
    }
  }
</style>
