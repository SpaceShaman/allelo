<script setup lang="ts">
import { viewportStore } from "@/store";
import interact from "interactjs";
import { watch } from "vue";

const viewport = viewportStore();

function createInteractInstances() {
  interact(".grid")
    .draggable({
      listeners: {
        move(event) {
          viewport.x += event.dx;
          viewport.y += event.dy;
        },
      },
    })
    .styleCursor(false);
}
watch(viewport, () => {
  createInteractInstances();
});
createInteractInstances();

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  viewport.scale += event.deltaY * -0.001;
  viewport.scale = Math.min(Math.max(0.1, viewport.scale), 10);
};

window.addEventListener("wheel", handleWheel, { passive: false });
</script>

<template>
  <div
    class="grid"
    :style="{
      backgroundPosition: `${viewport.x}px ${viewport.y}px`,
      backgroundSize: `${viewport.gridSize * viewport.scale}px ${
        viewport.gridSize * viewport.scale
      }px`,
    }"
  ></div>
</template>

<style>
.grid {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, grey 2px, transparent 2px),
    linear-gradient(to bottom, grey 2px, transparent 2px);
  background-repeat: repeat;
  cursor: crosshair;
  user-select: none;
  touch-action: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
svg g line {
  stroke: forestgreen !important;
}
</style>
