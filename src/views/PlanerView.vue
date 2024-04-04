<script setup lang="ts">
import { getPlantSvg } from "@/utils";
import interact from "interactjs";
import { ref, watch } from "vue";

const plantSize: number = 50;
const gridSize: number = 25;

const viewport = ref({ x: 0, y: 0, scale: 1 });

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
  interact(".grid")
    .draggable({
      listeners: {
        move(event) {
          viewport.value.x += event.dx;
          viewport.value.y += event.dy;
        },
      },
    })
    .styleCursor(false);

  interact(".plant")
    .draggable({
      listeners: {
        move(event) {
          const plant = plants.value.find(
            (plant) => plant.name === event.target.id
          );
          if (!plant) return;

          plant.position.x = Math.round(
            (plant.position.x * gridSize * viewport.value.scale + event.dx) /
              (gridSize * viewport.value.scale)
          );
          plant.position.y = Math.round(
            (plant.position.y * gridSize * viewport.value.scale + event.dy) /
              (gridSize * viewport.value.scale)
          );
        },
      },
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.createSnapGrid({
              x: gridSize * viewport.value.scale,
              y: gridSize * viewport.value.scale,
              offset: { x: viewport.value.x, y: viewport.value.y },
            }),
          ],
          relativePoints: [{ x: 0, y: 0 }],
        }),
      ],
    })
    .styleCursor(false);
}
watch(viewport.value, () => {
  createInteractInstances();
});
createInteractInstances();

const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  viewport.value.scale += event.deltaY * -0.001;
  viewport.value.scale = Math.min(Math.max(0.1, viewport.value.scale), 10);
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
        plant.position.x * (gridSize * viewport.scale) + viewport.x
      }px, ${plant.position.y * (gridSize * viewport.scale) + viewport.y}px)`,
      width: `${plantSize * viewport.scale}px`,
    }"
  />
  <div
    class="grid"
    :style="{
      backgroundPosition: `${viewport.x}px ${viewport.y}px`,
      backgroundSize: `${gridSize * viewport.scale}px ${
        gridSize * viewport.scale
      }px`,
    }"
  ></div>
  <Toolbar />
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  background-image: url("../assets/grid.svg");
  background-repeat: repeat;
  cursor: crosshair;
  user-select: none;
  touch-action: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
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
