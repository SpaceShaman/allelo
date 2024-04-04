<script setup lang="ts">
import { plantsStore, viewportStore } from "@/store";
import { getPlantSvg } from "@/utils";
import interact from "interactjs";
import { watch } from "vue";

const viewport = viewportStore();
const plants = plantsStore();

function createInteractInstances() {
  interact(".plant")
    .draggable({
      listeners: {
        move(event) {
          const plant = plants.planted.find(
            (plant) => plant.name === event.target.id
          );
          if (!plant) return;

          plant.position.x = Math.round(
            (plant.position.x * viewport.gridSize * viewport.scale + event.dx) /
              (viewport.gridSize * viewport.scale)
          );
          plant.position.y = Math.round(
            (plant.position.y * viewport.gridSize * viewport.scale + event.dy) /
              (viewport.gridSize * viewport.scale)
          );
        },
      },
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.createSnapGrid({
              x: viewport.gridSize * viewport.scale,
              y: viewport.gridSize * viewport.scale,
              offset: { x: viewport.x, y: viewport.y },
            }),
          ],
          relativePoints: [{ x: 0, y: 0 }],
        }),
      ],
    })
    .styleCursor(false);
}
watch(viewport, () => {
  createInteractInstances();
});
createInteractInstances();
</script>

<template>
  <img
    v-for="plant in plants.planted"
    :key="plant.name"
    :id="plant.name"
    :src="getPlantSvg(plant.name)"
    class="plant"
    :style="{
      transform: `translate(${
        plant.position.x * (viewport.gridSize * viewport.scale) + viewport.x
      }px, ${
        plant.position.y * (viewport.gridSize * viewport.scale) + viewport.y
      }px)`,
      width: `${viewport.plantSize * viewport.scale}px`,
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
