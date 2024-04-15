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
    // Select area
    if (toolbar.selected === "select") {
      if (!selecting.value) {
        viewport.selectArea.x = mouse.x;
        viewport.selectArea.y = mouse.y;
        viewport.selectArea.width = 0;
        viewport.selectArea.height = 0;
        selecting.value = true;
      } else {
        viewport.selectArea.width = mouse.x - viewport.selectArea.x;
        viewport.selectArea.height = mouse.y - viewport.selectArea.y;
      }
    }

    // Grid pressed
    if (mouse.target.id === "grid" && !movingPlants) {
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
    // Select a plant
    else if (mouse.target.className === "plant" && !movingPlants) {
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
    :style="{
      display: selecting ? 'block' : 'none',
      left:
        viewport.selectArea.width < 0
          ? viewport.selectArea.x + viewport.selectArea.width + 'px'
          : viewport.selectArea.x + 'px',
      top:
        viewport.selectArea.height < 0
          ? viewport.selectArea.y + viewport.selectArea.height + 'px'
          : viewport.selectArea.y + 'px',
      width:
        viewport.selectArea.width < 0
          ? -viewport.selectArea.width + 'px'
          : viewport.selectArea.width + 'px',
      height:
        viewport.selectArea.height < 0
          ? -viewport.selectArea.height + 'px'
          : viewport.selectArea.height + 'px',
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
