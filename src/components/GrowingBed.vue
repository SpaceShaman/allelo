<script setup lang="ts">
import { viewportStore } from "@/stores";
import type { GrowingBed } from "@/types";
import { computed, defineModel } from "vue";

const bed = defineModel<GrowingBed>({
  default: {
    id: 0,
    polygons: [
      { x: 0, y: 0 },
      { x: 100, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
  },
});

const viewport = viewportStore();

const cornerSize = 8;
const width = computed(() => {
  return (
    Math.max(...bed.value.corners.map((p) => p.x)) -
    Math.min(...bed.value.corners.map((p) => p.x)) +
    cornerSize * 2
  );
});
const height = computed(() => {
  return (
    Math.max(...bed.value.corners.map((p) => p.y)) -
    Math.min(...bed.value.corners.map((p) => p.y)) +
    cornerSize * 2
  );
});
const left = computed(() => {
  return Math.min(...bed.value.corners.map((p) => p.x));
});
const top = computed(() => {
  return Math.min(...bed.value.corners.map((p) => p.y));
});
</script>

<template>
  <svg
    :id="`bed-${bed.id}`"
    class="growing-bed"
    :style="{
      transform: `translate(
        ${(left - cornerSize) * viewport.scale + viewport.x}px, ${
        (top - cornerSize) * viewport.scale + viewport.y
      }px)`,
    }"
    :width="width * viewport.scale"
    :height="height * viewport.scale"
    :viewBox="`-${cornerSize} -${cornerSize} ${width} ${height}`"
  >
    <polygon
      :points="bed.corners.map((p) => `${p.x - left},${p.y - top}`).join(' ')"
      fill="rgb(var(--v-theme-primary))"
      fill-opacity="0.3"
      stroke="rgb(var(--v-theme-primary))"
      stroke-width="2"
      class="growing-bed"
    />
    <circle
      v-for="corner in bed.corners"
      :key="`corner-${corner.id}`"
      :id="`corner-${corner.id}`"
      :cx="corner.x - left"
      :cy="corner.y - top"
      :r="cornerSize"
      :fill="corner.selected ? 'red' : 'rgb(var(--v-theme-primary))'"
      class="bed-corner"
    />
  </svg>
</template>
<style scoped>
svg {
  cursor: crosshair;
  position: fixed;
}
circle {
  cursor: pointer;
}
</style>
