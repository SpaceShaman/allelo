<script setup lang="ts">
import { viewportStore } from "@/store";
import { getPlantSvg } from "@/utils";
import interact from "interactjs";
import { ref, watch } from "vue";

const viewport = viewportStore();

const plants = ref([
  {
    name: "carrot",
    position: { x: 5, y: 2 },
  },
  {
    name: "onion",
    position: { x: 5, y: 4 },
  },
  {
    name: "tomato",
    position: { x: 5, y: 6 },
  },
  {
    name: "cucumber",
    position: { x: 5, y: 8 },
  },
]);

function createInteractInstances() {
  interact(".plant")
    .draggable({
      listeners: {
        move(event) {
          const plant = plants.value.find(
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

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  viewport.scale += event.deltaY * -0.001;
  viewport.scale = Math.min(Math.max(0.1, viewport.scale), 10);
};

window.addEventListener("wheel", handleWheel, { passive: false });
</script>

<template>
  <div class="info">
    <div v-for="plant in plants" :key="plant.name" class="plant-info">
      <p>{{ plant.name }}</p>
      <p>{{ plant.position.x }} x {{ plant.position.y }}</p>
    </div>
    <div class="plant-info">
      <p>Viewport</p>
      <p>{{ viewport.x }} x {{ viewport.y }} x {{ viewport.scale }}</p>
    </div>
  </div>
  <img
    v-for="plant in plants"
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
  <Grid />
  <Toolbar />
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
.info {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(53, 190, 25, 0.8);
  z-index: 2;
}
.plant-info {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
