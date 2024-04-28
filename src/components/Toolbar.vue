<script setup lang="ts">
import plants from "@/plants";
import { toolbarStore } from "@/stores";
import { ref, watch } from "vue";

const toolbar = toolbarStore();

watch(
  () => toolbar.selected,
  (value: string, oldValue: string) => {
    if (value === "color-mode") toolbar.selected = oldValue;
  }
);
const tab = ref<string>();
</script>

<template>
  <v-btn-toggle v-model="toolbar.selected" mandatory elevation="2">
    <v-btn icon="mdi-cursor-default" value="default"></v-btn>
    <v-btn icon="mdi-select" value="select"><v-icon>mdi-select</v-icon></v-btn>
    <v-btn value="growing-bed"><PlantIcon name="growing-bed" /></v-btn>
    <v-btn
      v-for="[name, plant] in Object.entries(plants)"
      :key="name"
      :value="`plant-${name}`"
    >
      <PlantIcon :name="name" />
      <v-tooltip activator="parent" location="bottom">
        <h2>{{ name.charAt(0).toUpperCase() + name.slice(1) }}</h2>
        <v-row>
          <v-col>
            <h3 class="text-green">Friends</h3>
          </v-col>
          <v-col>
            <h3 class="text-red">Enemies</h3>
          </v-col>
        </v-row>
      </v-tooltip>
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
