<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";
import { getPlantSvg } from "@/utils";
import { ref, watch } from "vue";

const viewport = viewportStore();
const plants = plantsStore();

const menuItems = ref<string[]>([
  "carrot",
  "onion",
  "tomato",
  "cucumber",
  "strawberry",
]);

const selected = ref<string>("move");
watch(selected, (value: string, oldValue: string) => {
  if (value === "color-mode") selected.value = oldValue;
});

function addPlant(plant: string) {
  plants.planted.push({
    id: plants.planted.length,
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

document.addEventListener("mousedown", (e) => {
  if (
    (e.target as HTMLElement).id === "grid" &&
    selected.value !== "move" &&
    e.button === 0
  ) {
    addPlant(selected.value);
  }
});
// disable right-click context menu
document.addEventListener("contextmenu", (e) => e.preventDefault());
</script>

<template>
  <v-btn-toggle v-model="selected" elevation="2">
    <v-btn icon="mdi-cursor-move" value="move"></v-btn>
    <v-btn v-for="plant in menuItems" :key="plant" :value="plant">
      <v-icon style="--v-icon-size-multiplier: 1.5">
        <v-img :src="getPlantSvg(plant)"></v-img>
      </v-icon>
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
