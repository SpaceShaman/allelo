<script setup lang="ts">
import { usePlantedStore, viewportStore } from "@/stores";

const viewport = viewportStore();
const plants = usePlantedStore();
</script>

<template>
  <v-card class="info" elevation="2">
    <!-- <v-card
      title="Viewport"
      :text="`${viewport.x} x ${viewport.y} x ${viewport.scale}`"
      variant="text"
    /> -->
    <!-- <v-card
      title="Mouse"
      :text="`${viewport.mouse.x} x ${viewport.mouse.y}`"
      variant="text"
    /> -->
    <v-card
      v-for="plant in plants.planted"
      :key="plant.name"
      :title="`${plant.name}-${plant.id}`"
      :text="`${plant.position.x} x ${plant.position.y}`"
      variant="text"
    >
      <template v-slot:prepend>
        <PlantIcon :name="plant.name" />
      </template>
    </v-card>
  </v-card>
  <Plants />
  <Grid />
  <Toolbar />
</template>

<style scoped>
.info {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2;
}
</style>
@/stores
