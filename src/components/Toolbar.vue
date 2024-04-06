<script setup lang="ts">
import plants from "@/plants";
import { plantsStore, viewportStore } from "@/stores";
import { ref, watch } from "vue";

const viewport = viewportStore();
const plantedStore = plantsStore();

const selected = ref<string>("move");
watch(selected, (value: string, oldValue: string) => {
  if (value === "color-mode") selected.value = oldValue;
});

function addPlant(plant: string) {
  plantedStore.planted.push({
    id: Date.now(),
    name: plant,
    position: {
      x: Math.round(
        viewport.mouse.x / (viewport.gridSize * viewport.scale) - 1
      ),
      y: Math.round(
        viewport.mouse.y / (viewport.gridSize * viewport.scale) - 1
      ),
    },
  });
}

function deletePlant(id: number) {
  plantedStore.planted = plantedStore.planted.filter(
    (plant) => plant.id !== id
  );
}

// document.addEventListener("mousedown", (e) => {
//   const target = e.target as HTMLElement;
//   if (target.id === "grid" && selected.value !== "move" && e.button === 0) {
//     addPlant(selected.value);
//   } else if (target.classList.contains("plant") && e.button === 2) {
//     deletePlant(parseInt(target.id));
//   }
// });
// disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());
</script>

<template>
  <v-btn-toggle v-model="selected" elevation="2">
    <v-btn icon="mdi-cursor-move" value="move"></v-btn>
    <v-btn v-for="plant in plants" :key="plant.name" :value="plant.name">
      <PlantIcon :name="plant.name" />
    </v-btn>
    <!-- <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">
          <v-icon style="--v-icon-size-multiplier: 1.5">
            <v-img :src="getPlantSvg('strawberry')"></v-img>
          </v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="plant in plants"
          :key="plant"
          :value="plant"
        >
          <v-icon style="--v-icon-size-multiplier: 1.5">
            <v-img :src="getPlantSvg(plant)"></v-img>
          </v-icon>
        </v-list-item>
      </v-list>
    </v-menu> -->
    <ColorModeButton />
  </v-btn-toggle>
</template>
<style scoped>
.v-btn-toggle {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
}
</style>
