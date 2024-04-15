<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";

const viewport = viewportStore();
const plants = plantsStore();
</script>

<template>
  <v-card class="info overflow-auto" elevation="2">
    <!-- <v-card
      title="Viewport"
      :subtitle="`${viewport.x} x ${viewport.y} x ${viewport.scale}`"
      variant="text"
    />
    <v-card
      title="Mouse"
      :subtitle="`${viewport.mouse.x} x ${viewport.mouse.y}`"
      :text="`${viewport.mouse.pressed} ${viewport.mouse.button} ${viewport.mouse.target?.id} \n${viewport.mouse.moveX} x ${viewport.mouse.moveY}`"
      variant="text"
    /> -->
    <v-card
      v-for="plant in plants.selected"
      :key="plant.name"
      :title="plant.name"
      :subtitle="`${plant.position.x.toFixed()} x ${plant.position.y.toFixed()}`"
      variant="text"
    >
      <template v-slot:prepend>
        <PlantIcon :name="plant.name" />
      </template>
    </v-card>
  </v-card>
</template>

<style scoped>
.info {
  position: fixed;
  right: 0;
  margin: 20px;
  max-height: calc(100vh - 40px);
  z-index: 2;
}
</style>
