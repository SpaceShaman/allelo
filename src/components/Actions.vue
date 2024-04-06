<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";
import { watch } from "vue";

const viewport = viewportStore();
const plants = plantsStore();

// Mouse actions
watch(viewport.mouse, (mouse) => {
  if (!mouse.target) return;
  // Left mouse button pressed
  if (mouse.pressed && mouse.button === 0) {
    // Move viewport with the mouse
    if (mouse.target.id === "grid") {
      viewport.x += mouse.moveX;
      viewport.y += mouse.moveY;
    }
    // Drag a plant
    else if (mouse.target.className === "plant") {
      const plant = plants.getPlantById(Number(mouse.target.id));
      if (!plant) return;
      plant.position.x += mouse.moveX;
      plant.position.y += mouse.moveY;
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
</script>
