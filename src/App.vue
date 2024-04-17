<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";

const viewport = viewportStore();
const plants = plantsStore();
</script>

<template>
  <v-app>
    <v-main>
      <Plants />
      <Grid />
      <Toolbar />
      <Selected />
      <Actions />
      <GrowingBeds />
    </v-main>
  </v-app>
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
