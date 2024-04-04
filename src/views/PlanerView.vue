<script setup lang="ts">
import { plantsStore, viewportStore } from "@/store";

const viewport = viewportStore();
const plants = plantsStore();
</script>

<template>
  <v-card class="info" elevation="3">
    <div v-for="plant in plants.planted" :key="plant.name" class="plant-info">
      <p>{{ plant.name }}</p>
      <p>{{ plant.position.x }} x {{ plant.position.y }}</p>
    </div>
    <div class="plant-info">
      <p>Viewport</p>
      <p>{{ viewport.x }} x {{ viewport.y }} x {{ viewport.scale }}</p>
    </div>
  </v-card>
  <Plants />
  <Grid />
  <Toolbar />
</template>

<style scoped>
.info {
  position: fixed;
  top: 20px;
  right: 10px;
  z-index: 2;
}
.plant-info {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
