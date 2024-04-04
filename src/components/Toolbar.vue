<script setup lang="ts">
import { getPlantSvg } from "@/utils";
import { ref, watch } from "vue";

const plants = ref([
  {
    name: "carrot",
  },
  {
    name: "onion",
  },
  {
    name: "tomato",
  },
  {
    name: "cucumber",
  },
]);

const toggle = ref("move");
watch(toggle, (value) => {
  if (value === "color-mode") toggle.value = "move";
});
</script>

<template>
  <v-btn-toggle v-model="toggle" mandatory elevation="2">
    <v-btn icon="mdi-cursor-move" value="move"></v-btn>
    <v-btn v-for="plant in plants" :key="plant.name" :value="plant.name">
      <v-icon style="--v-icon-size-multiplier: 1.5">
        <v-img :src="getPlantSvg(plant.name)"></v-img>
      </v-icon>
    </v-btn>
    <v-menu>
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
          :key="plant.name"
          :value="plant.name"
        >
          <v-icon style="--v-icon-size-multiplier: 1.5">
            <v-img :src="getPlantSvg(plant.name)"></v-img>
          </v-icon>
        </v-list-item>
      </v-list>
    </v-menu>
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
