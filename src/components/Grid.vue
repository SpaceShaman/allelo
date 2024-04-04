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
  viewport.scale = parseFloat(
    Math.min(Math.max(0.6, viewport.scale), 5).toFixed(1)
  );
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
      backgroundImage: `linear-gradient(
          to right,
          rgb(var(--v-theme-on-surface-variant)) ${viewport.scale * 2.1}px,
          transparent 0px
        ),
        linear-gradient(
          to bottom,
          rgb(var(--v-theme-on-surface-variant)) ${viewport.scale * 2.1}px,
          transparent 0px
        )`,
    }"
  ></div>
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  background-repeat: repeat;
  cursor: crosshair;
  user-select: none;
  touch-action: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
