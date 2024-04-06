<script setup lang="ts">
import { plantsStore, toolbarStore, viewportStore } from "@/stores";
import { watch } from "vue";

const viewport = viewportStore();
const plants = plantsStore();
const toolbar = toolbarStore();

// Mouse actions
watch(viewport.mouse, (mouse) => {
  if (!mouse.target) return;
  // Left mouse button pressed
  if (mouse.pressed && mouse.button === 0) {
    // Grid pressed
    if (mouse.target.id === "grid") {
      // Move viewport with the mouse
      if (toolbar.selected === "move") {
        viewport.x += mouse.moveX;
        viewport.y += mouse.moveY;
      }
      // Add a plant
      else {
        plants.addPlant(
          toolbar.selected,
          (mouse.x + viewport.x) / viewport.scale,
          (mouse.y + viewport.y) / viewport.scale
        );
      }
    }
    // Drag a plant
    else if (mouse.target.className === "plant") {
      const plant = plants.getPlantById(Number(mouse.target.id));
      if (!plant) return;
      plant.position.x += mouse.moveX;
      plant.position.y += mouse.moveY;
    }
  }
  // Right mouse button pressed
  else if (mouse.pressed && mouse.button === 2) {
    // Remove a plant
    if (mouse.target.className === "plant") {
      plants.removePlant(Number(mouse.target.id));
    }
  }
});

// Zoom in and out with the mouse wheel
const handleWheel = (event: WheelEvent) => {
  const target = event.target as HTMLElement;
  if (target.id === "grid" || target.classList.contains("plant")) {
    event.preventDefault();
    viewport.scale += event.deltaY * -0.001;
    viewport.scale = parseFloat(
      Math.min(Math.max(0.6, viewport.scale), 5).toFixed(1)
    );
  }
};
window.addEventListener("wheel", handleWheel, { passive: false });

// disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());
</script>
