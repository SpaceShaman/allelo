<script setup lang="ts">
import { usePlantedStore, viewportStore } from "@/stores";
import { getPlantSvg } from "@/utils";
import interact from "interactjs";
import { watch } from "vue";

const viewport = viewportStore();
const plantedStore = usePlantedStore();

function createInteractInstances() {
  interact(".plant")
    .draggable({
      listeners: {
        move(event) {
          const plant = plantedStore.planted.find(
            (plant) => `${plant.id}` === event.target.id
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

for (let i = 0; i < 100; i++) {
  plantedStore.planted.push({
    id: i,
    name: "onion",
    position: {
      x: Math.round(i * Math.cos(i * 0.5) * 0.15 + 20),
      y: Math.round(i * Math.sin(i * 0.5) * 0.15 + 20),
    },
  });
}
for (let i = 100; i < 200; i++) {
  plantedStore.planted.push({
    id: i,
    name: "strawberry",
    position: {
      x: Math.round(i * Math.cos(i * 0.5) * 0.15 + 20),
      y: Math.round(i * Math.sin(i * 0.5) * 0.15 + 20),
    },
  });
}
for (let i = 200; i < 300; i++) {
  plantedStore.planted.push({
    id: i,
    name: "carrot",
    position: {
      x: Math.round(i * Math.cos(i * 0.5) * 0.15 + 20),
      y: Math.round(i * Math.sin(i * 0.5) * 0.15 + 20),
    },
  });
}
</script>

<template>
  <img
    v-for="plant in plantedStore.planted"
    :key="plant.id"
    :id="`${plant.id}`"
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
@/stores
