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

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  background-image: url("../assets/grid.svg");
  background-repeat: repeat;
  stroke: #e91e63;
  cursor: crosshair;
  user-select: none;
  touch-action: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
