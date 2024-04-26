<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";
import { getPlantSvg } from "@/utils";

const viewport = viewportStore();

const plants = plantsStore();

plants.add("tomato", { x: 400, y: 600 });
</script>

<template>
  <img
    v-for="[id, plant] in Object.entries(plants.planted)"
    :key="id"
    :id="`${id}`"
    :src="getPlantSvg(plant.name)"
    class="plant"
    draggable="false"
    :style="{
      transform: `translate(${
        (plant.position.x - plants.plantSize / 2) * viewport.scale + viewport.x
      }px, ${
        (plant.position.y - plants.plantSize / 2) * viewport.scale + viewport.y
      }px)`,
      width: `${plants.plantSize * viewport.scale}px`,
      outline: plant.hovered
        ? '3px solid green'
        : plant.selected
        ? '2px solid rgb(var(--v-theme-primary))'
        : 'none',
      filter:
        plant.enemies && plant.enemies.length > 0
          ? 'brightness(100%) contrast(100%) invert(40%) sepia(80%) saturate(500%) hue-rotate(-40deg)'
          : plant.friends && plant.friends.length > 0
          ? 'brightness(100%) contrast(100%) invert(30%) sepia(40%) saturate(500%) hue-rotate(40deg)'
          : 'none',
    }"
  />
</template>

<style scoped>
.plant {
  touch-action: none;
  user-select: none;
  cursor: grab;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
