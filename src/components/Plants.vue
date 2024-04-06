<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";
import { getPlantSvg } from "@/utils";

const viewport = viewportStore();

const plants = plantsStore();
</script>

<template>
  <img
    v-for="plant in plants.planted"
    :key="plant.id"
    :id="`${plant.id}`"
    :src="getPlantSvg(plant.name)"
    class="plant"
    draggable="false"
    :style="{
      transform: `translate(${
        plant.position.x * viewport.scale + viewport.x
      }px, ${plant.position.y * viewport.scale + viewport.y}px)`,
      width: `${plants.plantSize * viewport.scale}px`,
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
@/stores
