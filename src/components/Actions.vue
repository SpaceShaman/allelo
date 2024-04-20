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
var drawingGrowingBed = false;

function countPositionOnGrid(x: number, y: number) {
  return {
    x: (x - viewport.x) / viewport.scale,
    y: (y - viewport.y) / viewport.scale,
  };
}

// Watch the mouse up event
watch(
  () => input.mouse.up,
  (up) => {
    if (up) {
      moving = false;
      selecting.value = false;
      if (drawingGrowingBed) {
        growingBeds.addBed(
          countPositionOnGrid(
            viewport.selectArea.startX,
            viewport.selectArea.startY
          ),
          countPositionOnGrid(
            viewport.selectArea.endX,
            viewport.selectArea.endY
          )
        );
      }
      drawingGrowingBed = false;
    }
  }
);

// Watch the mouse events
watch(input.mouse, (mouse) => {
  const target = mouse.target;
  if (!target) return;
  // Left mouse button pressed
  if (mouse.pressed && mouse.button === 0) {
    // If don't press ctrl key, unselect all plants
    if (!mouse.ctrl && !moving) {
      plants.unselectAll();
      growingBeds.unselectAllCorners();
    }
    // Add a plant
    if (
      toolbar.selected.includes("plant-") &&
      [
        "grid",
        "growing-bed",
        "growing-bed-croner",
        "growing-bed-polygon",
      ].includes(target.getAttribute("class") as string)
    ) {
      plants.addPlant(
        toolbar.selected.replace("plant-", ""),
        (mouse.x - viewport.x) / viewport.scale,
        (mouse.y - viewport.y) / viewport.scale
      );
    }
    // Select single plant
    else if (target.className === "plant" && !moving && !selecting.value) {
      plants.select(Number(target.id));
      moving = true;
    }
    // Select growing bed corner
    else if (
      target.getAttribute("class") === "growing-bed-corner" &&
      !moving &&
      !selecting.value
    ) {
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
      const parent = target.parentElement;
      if (!parent) return;
      const bedId = Number(parent.id.replace("bed-", ""));
      growingBeds.selectBed(bedId);
      plants.selectInGrowingBed(bedId, viewport.x, viewport.y, viewport.scale);
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
    // Select area and draw growing bed
    if (
      ["select", "growing-bed"].includes(toolbar.selected) &&
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
        if (toolbar.selected === "growing-bed") {
          drawingGrowingBed = true;
        }
      } else {
        viewport.selectArea.endX = mouse.x;
        viewport.selectArea.endY = mouse.y;
      }
      if (toolbar.selected === "select") {
        // Select plants in the area
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
  }
  // Middle mouse button pressed
  else if (mouse.pressed && mouse.button === 1) {
    // Remove a plant
    if (target.className === "plant") {
      plants.remove(Number(target.id));
    }
    // Remove a growing bed corner
    else if (target.getAttribute("class") === "growing-bed-corner") {
      const parent = target.parentElement;
      if (!parent) return;
      const bedId = Number(parent.id.replace("bed-", ""));
      const cornerId = Number(target.id.replace("corner-", ""));
      growingBeds.removeCorner(bedId, cornerId);
    }
  }
  // Right mouse button pressed
  else if (mouse.pressed && mouse.button === 2) {
    // Move viewport with the mouse
    viewport.x += mouse.moveX;
    viewport.y += mouse.moveY;
  }
});

// Watch mouse double click events
watch(
  () => input.mouse.doubleClick,
  () => {
    const target = input.mouse.target as HTMLElement;
    // Add corner to the growing bed when double click on the polygon
    if (target.getAttribute("class") === "growing-bed-polygon") {
      const parent = target.parentElement;
      if (!parent) return;
      const bedId = Number(parent.id.replace("bed-", ""));
      growingBeds.addCorner(
        bedId,
        (input.mouse.x - viewport.x) / viewport.scale,
        (input.mouse.y - viewport.y) / viewport.scale
      );
    }
  }
);

// Watch the keyboard events
watch(input.keyboard, (keyboard) => {
  // Delete selected plants and growing bed corners
  if (keyboard.key === "Delete") {
    plants.removeSelected();
    growingBeds.removeSelectedCorners();
  }
  // Select all plants and growing bed corners
  else if (keyboard.key === "a" && keyboard.ctrl) {
    plants.selectAll();
    growingBeds.selectAll();
  }
  // Unselect all plants and growing bed corners
  else if (keyboard.key === "Escape") {
    plants.unselectAll();
    growingBeds.unselectAllCorners();
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
