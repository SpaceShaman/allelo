<script setup lang="ts">
import { viewportStore } from "@/stores";

const viewport = viewportStore();
</script>

<template>
  <div
    id="grid"
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
#grid {
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
@/stores
