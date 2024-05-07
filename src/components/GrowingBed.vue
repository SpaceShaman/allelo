<script setup lang="ts">
import { viewportStore } from "@/stores";
import type { GrowingBed } from "@/types";
import { computed, defineModel } from "vue";

const bed = defineModel<GrowingBed>({
  default: {
    id: 0,
    corners: [
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
const isSelected = computed(() => {
  return bed.value.corners.some((corner) => corner.selected);
});

function getDistance(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}
function getMidPoint(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const left = Math.min(...bed.value.corners.map((p) => p.x));
  const top = Math.min(...bed.value.corners.map((p) => p.y));
  return { x: (p1.x + p2.x) / 2 - left, y: (p1.y + p2.y) / 2 - top };
}
function getAngle(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return (Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180) / Math.PI;
}
function getRotationAngle(
  p1: { x: number; y: number },
  p2: { x: number; y: number }
) {
  const angle = getAngle(p1, p2);
  if (angle < -90) {
    return angle + 180;
  } else if (angle > 90) {
    return angle - 180;
  }
  return angle;
}
function getDY(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return getAngle(p1, p2) < -90 || getAngle(p1, p2) > 90 ? -5 : 18;
}
function getDX(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  return -`${getDistance(p1, p2).toFixed(0)}cm`.length * 6;
}
</script>

<template>
  <svg
    class="growing-bed"
    :id="`bed-${bed.id}`"
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
      class="growing-bed-polygon"
      :points="bed.corners.map((p) => `${p.x - left},${p.y - top}`).join(' ')"
      fill="rgb(var(--v-theme-primary))"
      fill-opacity="0.3"
      stroke="rgb(var(--v-theme-primary))"
      stroke-width="2"
    />
    <template v-for="(corner, index) in bed.corners">
      <text
        :key="`corner-${corner.id}`"
        v-if="
          getDistance(
            bed.corners[index],
            bed.corners[(index + 1) % bed.corners.length]
          ) > 50
        "
        :x="
          getMidPoint(
            bed.corners[index],
            bed.corners[(index + 1) % bed.corners.length]
          ).x
        "
        :y="
          getMidPoint(
            bed.corners[index],
            bed.corners[(index + 1) % bed.corners.length]
          ).y
        "
        :dy="
          getDY(
            bed.corners[index],
            bed.corners[(index + 1) % bed.corners.length]
          )
        "
        :dx="
          getDX(
            bed.corners[index],
            bed.corners[(index + 1) % bed.corners.length]
          )
        "
        :transform="`rotate(${getRotationAngle(
          bed.corners[index],
          bed.corners[(index + 1) % bed.corners.length]
        )},
      ${
        getMidPoint(
          bed.corners[index],
          bed.corners[(index + 1) % bed.corners.length]
        ).x
      },
      ${
        getMidPoint(
          bed.corners[index],
          bed.corners[(index + 1) % bed.corners.length]
        ).y
      }
      )`"
        :fill="
          bed.corners[index].selected ||
          bed.corners[(index + 1) % bed.corners.length].selected
            ? 'red'
            : 'rgb(var(--v-theme-primary))'
        "
        font-size="20"
      >
        {{
          getDistance(
            bed.corners[index],
            bed.corners[(index + 1) % bed.corners.length]
          ).toFixed(0)
        }}cm
      </text>
    </template>
    <circle
      v-if="isSelected"
      class="growing-bed-corner"
      v-for="corner in bed.corners"
      :key="`corner-${corner.id}`"
      :id="`corner-${corner.id}`"
      :cx="corner.x - left"
      :cy="corner.y - top"
      :r="cornerSize"
      :fill="corner.selected ? 'red' : 'rgb(var(--v-theme-primary))'"
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
