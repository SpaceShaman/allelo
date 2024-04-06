<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";
import { watch } from "vue";

const viewport = viewportStore();
const plants = plantsStore();

watch(viewport.mouse, (mouse) => {
  if (!mouse.target) return;
  if (mouse.target.className === "plant") {
    if (mouse.pressed && mouse.button === 0) {
      console.log("Plant dragged", mouse.target.id);
      const plant = plants.getPlantById(Number(mouse.target.id));
      if (!plant) return;
      if (plant.position.x !== mouse.x || plant.position.y !== mouse.y) {
        plant.position.x = mouse.x;
        plant.position.y = mouse.y;
      }
    }
  } else if (mouse.target.id === "grid") {
    if (mouse.pressed && mouse.button === 0) {
      viewport.x += mouse.moveX;
      viewport.y += mouse.moveY;
    }
  }
});

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
