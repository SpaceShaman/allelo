<script setup lang="ts">
import plants from "@/plants";
import { toolbarStore } from "@/stores";
import { watch } from "vue";

const toolbar = toolbarStore();

watch(
  () => toolbar.selected,
  (value: string, oldValue: string) => {
    if (value === "color-mode") toolbar.selected = oldValue;
  }
);
</script>

<template>
  <v-btn-toggle v-model="toolbar.selected" mandatory elevation="2">
    <v-btn icon="mdi-cursor-move" value="move"></v-btn>
    <v-btn icon="mdi-select" value="select"></v-btn>
    <v-btn
      v-for="plant in plants"
      :key="plant.name"
      :value="`plant-${plant.name}`"
    >
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
