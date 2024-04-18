<script setup lang="ts">
import {
  growingBedsStore,
  inputStore,
  plantsStore,
  toolbarStore,
  viewportStore,
} from "@/stores";
import { ref, watch } from "vue";

const viewport = viewportStore();
const input = inputStore();
const plants = plantsStore();
const growingBeds = growingBedsStore();
const toolbar = toolbarStore();

var moving = false;
var selecting = ref(false);
document.addEventListener("mouseup", (e) => {
  moving = false;
  selecting.value = false;
});

// Mouse actions
watch(input.mouse, (mouse) => {
  const target = mouse.target;
  if (!target) return;
  // Left mouse button pressed
  if (mouse.pressed && mouse.button === 0) {
    // Grid or growing bed pressed
    if (target.id === "grid" && !moving && !selecting.value) {
      plants.unselectAll();
      growingBeds.unselectAllCorners();
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
    else if (target.className === "plant" && !moving && !selecting.value) {
      // Select multiple plants with ctrl key pressed or select only one plant without ctrl key pressed
      if (!mouse.ctrl) {
        plants.unselectAll();
        growingBeds.unselectAllCorners();
      }
      plants.select(Number(target.id));
      moving = true;
    }
    // Select growing bed corner
    else if (
      target.getAttribute("class") === "growing-bed-corner" &&
      !moving &&
      !selecting.value
    ) {
      if (!mouse.ctrl) {
        plants.unselectAll();
        growingBeds.unselectAllCorners();
      }
      const parent = target.parentElement;
      if (!parent) return;
      const bedId = Number(parent.id.replace("bed-", ""));
      const cornerId = Number(target.id.replace("corner-", ""));
      growingBeds.selectCorner(bedId, cornerId);
      moving = true;
    }
    // Select whole growing bed and plants inside
    else if (
      target.getAttribute("class") === "growing-bed-polygon" &&
      !moving &&
      !selecting.value
    ) {
      if (!mouse.ctrl) {
        plants.unselectAll();
        growingBeds.unselectAllCorners();
      }
      const parent = target.parentElement;
      if (!parent) return;
      const bedId = Number(parent.id.replace("bed-", ""));
      growingBeds.selectBed(bedId);
      plants.selectInGrowingBed(bedId);
      moving = true;
    }
    // Move plants with the mouse
    if (moving && plants.selected && !selecting.value) {
      plants.movePlants(mouse.moveX, mouse.moveY, viewport.scale);
    }
    // Move growing bed corner with the mouse
    if (moving && growingBeds.selectedCorners && !selecting.value) {
      growingBeds.moveCorners(mouse.moveX, mouse.moveY, viewport.scale);
    }
    // Select area
    if (
      toolbar.selected === "select" &&
      !moving &&
      [
        "grid",
        "plant",
        "select-area",
        "growing-bed",
        "growing-bed-croner",
        "growing-bed-polygon",
      ].includes(target.getAttribute("class") as string)
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
      plants.selectArea(
        viewport.selectArea.startX,
        viewport.selectArea.startY,
        viewport.selectArea.endX,
        viewport.selectArea.endY,
        viewport.x,
        viewport.y,
        viewport.scale
      );
      // Select growing bed corners in the area
      growingBeds.unselectAllCorners();
      growingBeds.selectArea(
        viewport.selectArea.startX,
        viewport.selectArea.startY,
        viewport.selectArea.endX,
        viewport.selectArea.endY,
        viewport.x,
        viewport.y,
        viewport.scale
      );
    }
  }
  // Middle mouse button pressed
  else if (mouse.pressed && mouse.button === 1) {
    // Remove a plant
    if (target.className === "plant") {
      plants.removePlant(Number(target.id));
    }
  }
  // Right mouse button pressed
  else if (mouse.pressed && mouse.button === 2) {
    // Grid pressed
    if (target.id === "grid") {
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
  const x = input.mouse.x;
  const y = input.mouse.y;

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
  border: 2px solid rgb(var(--v-theme-primary));
  cursor: crosshair;
}
</style>
