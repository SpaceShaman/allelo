<script setup lang="ts">
import { plantsStore, toolbarStore, viewportStore } from "@/stores";
import { ref, watch } from "vue";

const viewport = viewportStore();
const plants = plantsStore();
const toolbar = toolbarStore();

var movingPlants = false;
var selecting = ref(false);
document.addEventListener("mouseup", (e) => {
  movingPlants = false;
  selecting.value = false;
});

// Mouse actions
watch(viewport.mouse, (mouse) => {
  if (!mouse.target) return;
  // Left mouse button pressed
  if (mouse.pressed && mouse.button === 0) {
    // Grid pressed
    if (mouse.target.id === "grid" && !movingPlants && !selecting.value) {
      plants.unselectAll();
      // Move viewport with the mouse
      if (toolbar.selected === "move") {
        viewport.x += mouse.moveX;
        viewport.y += mouse.moveY;
      }
      // Add a plant
      else if (toolbar.selected.includes("plant-")) {
        plants.addPlant(
          toolbar.selected.replace("plant-", ""),
          (mouse.x - viewport.x) / viewport.scale,
          (mouse.y - viewport.y) / viewport.scale
        );
      }
    }
    // Select single plant
    else if (
      mouse.target.className === "plant" &&
      !movingPlants &&
      !selecting.value
    ) {
      if (!mouse.ctrl) plants.unselectAll();
      plants.select(Number(mouse.target.id));
      movingPlants = true;
    }
    // Move plant with the mouse
    if (plants.selected && movingPlants && !selecting.value) {
      plants.selected.forEach((plant) => {
        plant.position.x += mouse.moveX / viewport.scale;
        plant.position.y += mouse.moveY / viewport.scale;
      });
    }
    // Select area
    if (
      toolbar.selected === "select" &&
      !movingPlants &&
      ["grid", "plant", "select-area"].includes(mouse.target.className)
    ) {
      if (!selecting.value) {
        viewport.selectArea.startX = mouse.x;
        viewport.selectArea.startY = mouse.y;
        viewport.selectArea.endX = mouse.x;
        viewport.selectArea.endY = mouse.y;
        selecting.value = true;
      } else {
        viewport.selectArea.endX = mouse.x;
        viewport.selectArea.endY = mouse.y;
      }
      // Select plants in the area
      plants.unselectAll();
      // plants.planted.forEach((plant: PlantedPlant) => {
      //   const plantX = plant.position.x * viewport.scale + viewport.x;
      //   const plantY = plant.position.y * viewport.scale + viewport.y;
      //   const plantSize = plants.plantSize * viewport.scale;
      //   let startX = viewport.selectArea.startX;
      //   let startY = viewport.selectArea.startY;
      //   let endX = viewport.selectArea.startX + viewport.selectArea.endX;
      //   let endY = viewport.selectArea.startY + viewport.selectArea.endY;
      //   if (startX > endX) {
      //     [startX, endX] = [endX, startX];
      //   }
      //   if (startY > endY) {
      //     [startY, endY] = [endY, startY];
      //   }
      //   if (
      //     plantX > startX - plantSize / 2 &&
      //     plantX < endX + plantSize / 2 &&
      //     plantY > startY - plantSize / 2 &&
      //     plantY < endY + plantSize / 2
      //   ) {
      //     plants.select(plant.id);
      //   }
      // });
    }
  }
  // Middle mouse button pressed
  else if (mouse.pressed && mouse.button === 1) {
    // Remove a plant
    if (mouse.target.className === "plant") {
      plants.removePlant(Number(mouse.target.id));
    }
  }
  // Right mouse button pressed
  else if (mouse.pressed && mouse.button === 2) {
    // Grid pressed
    if (mouse.target.id === "grid") {
      // Move viewport with the mouse
      viewport.x += mouse.moveX;
      viewport.y += mouse.moveY;
    }
  }
});

// Zoom in and out with the mouse wheel
const handleWheel = (event: WheelEvent) => {
  event.preventDefault();

  // Calculate the point on the screen that should remain fixed during scaling
  const x = viewport.mouse.x;
  const y = viewport.mouse.y;

  // Calculate the new scale
  let newScale = viewport.scale + event.deltaY * -0.001;
  newScale = parseFloat(Math.min(Math.max(0.1, newScale), 5).toFixed(1));

  // Calculate the new position of the viewport
  const newX = x - (x - viewport.x) * (newScale / viewport.scale);
  const newY = y - (y - viewport.y) * (newScale / viewport.scale);

  // Update the scale and position of the viewport
  viewport.scale = newScale;
  viewport.x = newX;
  viewport.y = newY;
};
window.addEventListener("wheel", handleWheel, { passive: false });

// disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());
</script>
<template>
  <div
    id="select-area"
    class="select-area"
    :style="{
      display: selecting ? 'block' : 'none',
      left:
        viewport.selectArea.endX < viewport.selectArea.startX
          ? viewport.selectArea.endX + 'px'
          : viewport.selectArea.startX + 'px',
      top:
        viewport.selectArea.endY < viewport.selectArea.startY
          ? viewport.selectArea.endY + 'px'
          : viewport.selectArea.startY + 'px',
      width:
        viewport.selectArea.endX < viewport.selectArea.startX
          ? viewport.selectArea.startX - viewport.selectArea.endX + 'px'
          : viewport.selectArea.endX - viewport.selectArea.startX + 'px',
      height:
        viewport.selectArea.endY < viewport.selectArea.startY
          ? viewport.selectArea.startY - viewport.selectArea.endY + 'px'
          : viewport.selectArea.endY - viewport.selectArea.startY + 'px',
    }"
  ></div>
</template>
<style scoped>
#select-area {
  position: fixed;
  z-index: 10000;
  border: 2px solid green;
  cursor: crosshair;
}
</style>
