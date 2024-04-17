<script setup lang="ts">
import { viewportStore } from "@/stores";
import { computed, ref } from "vue";

const viewport = viewportStore();

interface Polygon {
  x: number;
  y: number;
}

const cornerSize = 5;

const polygons = ref<Polygon[]>([
  { x: 0, y: 0 },
  { x: 200, y: 0 },
  { x: 200, y: 200 },
  { x: 0, y: 400 },
]);

const width = computed(() => {
  return Math.max(...polygons.value.map((p) => p.x)) + cornerSize * 2;
});
const height = computed(() => {
  return Math.max(...polygons.value.map((p) => p.y)) + cornerSize * 2;
});
</script>

<template>
  <svg
    class="growing-bed"
    :style="{
      transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`,
    }"
    :width="width"
    :height="height"
    :viewBox="`-${cornerSize} -${cornerSize} ${width} ${height}`"
  >
    <polygon
      :points="polygons.map((p) => `${p.x},${p.y}`).join(' ')"
      fill="green"
      fill-opacity="0.3"
      stroke="black"
      stroke-width="2"
    />
    <circle
      v-for="polygon in polygons"
      :key="`polygon-${polygon.x}-${polygon.y}`"
      :cx="polygon.x"
      :cy="polygon.y"
      :r="cornerSize"
      fill="red"
    />
  </svg>
</template>
<style scoped>
svg {
  cursor: crosshair;
}
circle {
  cursor: pointer;
}
</style>
