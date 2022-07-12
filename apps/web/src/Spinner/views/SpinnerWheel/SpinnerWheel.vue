<script lang="ts" setup>
import { ref, watch } from "vue";

// see: https://github.com/vuejs/core/issues/4294
interface SpinnerWheelProps {
  description?: string;
  isLocked: boolean;
  isSpinning: boolean;
  name: string;
  value?: string;
}

const props = defineProps<SpinnerWheelProps>();

const isAnimating = ref(false);

watch(
  () => props.value,
  () => {
    isAnimating.value = true;
  }
);

defineEmits(["lock", "unlock"]);

function clearChange() {
  isAnimating.value = false;
}
</script>

<template>
  <li :class="{
    'SpinnerWheel': true,
    'SpinnerWheel--stopped': isLocked || !isSpinning,
    'SpinnerWheel--tick': !isLocked && isAnimating && isSpinning,
  }" @animationend="clearChange">
    <header class="SpinnerWheel__header">
      <h2 class="SpinnerWheel__name">{{ name }}</h2>
      <i :class="{
        'SpinnerWheel__lock': true,
        'SpinnerWheel__lock--locked': isLocked
      }" role="button"
        @click.prevent="!isSpinning && $emit(isLocked ? 'unlock' : 'lock', name)">
        {{ isLocked
            ? "🔒"
            : "🔓"
        }}
      </i>
    </header>
    <div :class="{
      'SpinnerWheel__value': true,
      'SpinnerWheel__value--description': Boolean(description) && (isLocked || !isSpinning)
    }" :title="description">
      {{ value ?? "--" }}
    </div>
  </li>
</template>

<style scoped>
* {
  all: initial;
}

.SpinnerWheel {
  animation-duration: var(--animation-timing);
  background: var(--color-primary);
  border-radius: var(--gutter-narrow);
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  position: relative;
  transition: background var(--animation-timing) ease-out;
}

.SpinnerWheel__header {
  background: var(--color-primary-variant);
  border-bottom: var(--hairline) solid var(--color-primary);
  height: var(--gutter-wide);
  line-height: var(--gutter-wide);
  width: 100%;
}

.SpinnerWheel__header * {
  user-select: none;
}

.SpinnerWheel__name {
  color: var(--color-primary-variant-foreground);
  font-family: var(--font-primary);
  font-size: var(--gutter-narrow);
  font-weight: bold;
  text-transform: uppercase;
}

.SpinnerWheel__lock {
  cursor: pointer;
  float: right;
  line-height: var(--gutter-wide);
  opacity: 0.5;
  position: absolute;
  right: var(--gutter-narrow);
}

.SpinnerWheel__lock.SpinnerWheel__lock--locked {
  opacity: 1;
}

.SpinnerWheel__value {
  color: var(--color-primary-foreground);
  flex-grow: 1;
  font-family: var(--font-secondary);
  text-align: center;
  font-size: var(--gutter-wide);
  transition: color var(--animation-timing) ease-out;
  padding: var(--gutter-narrow);
}

.SpinnerWheel__value--description {
  cursor: help;
}

.SpinnerWheel__value--description::before {
  content: "ℹ️";
  padding: var(--gutter-narrow);
}

.SpinnerWheel,
.SpinnerWheel__header,
.SpinnerWheel__value {
  align-items: center;
  display: flex;
  justify-content: center;
}

.SpinnerWheel--tick {
  animation-name: tick;
}

@keyframes tick {
  from {
    background-color: var(--color-primary-variant);
    border-color: var(--color-primary-variant-foreground);
    color: var(--color-primary-variant-foreground);
  }

  to {
    background-color: var(--color-primary);
    border-color: var(--color-primary-foreground);
    color: var(--color-primary-foreground);
  }
}

.SpinnerWheel--stopped {
  background: var(--color-primary-variant);
}

.SpinnerWheel--stopped>.SpinnerWheel__value {
  color: var(--color-primary-variant-foreground);
}

.SpinnerWheel--stopped>.SpinnerWheel__name {
  border-color: var(--color-primary-variant-foreground);
}
</style>
