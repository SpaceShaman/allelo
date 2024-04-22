<script setup lang="ts">
import { plantsStore, viewportStore } from "@/stores";
import { PlantedPlant } from "@/types";
import { computed, ref } from "vue";

const viewport = viewportStore();
const plants = plantsStore();

const grupedPlants = computed(() => {
  const grouped: Record<string, PlantedPlant[]> = {};
  for (const [id, plant] of Object.entries(plants.selected)) {
    if (!grouped[plant.name]) {
      grouped[plant.name] = [];
    }
    grouped[plant.name].push(plant);
  }
  return grouped;
});
const open = ref<string[]>([]);
</script>

<template>
  <v-card class="info overflow-auto" elevation="2">
    <!-- <v-card
      title="Viewport"
      :subtitle="`${viewport.x} x ${viewport.y} x ${viewport.scale}`"
      variant="text"
    />
    <v-card
      title="Select Area"
      :subtitle="`${viewport.selectArea.startX} x ${viewport.selectArea.startY} x ${viewport.selectArea.endX} x ${viewport.selectArea.endY}`"
      variant="text"
    />
    <v-card
      title="Mouse"
      :subtitle="`${viewport.mouse.x} x ${viewport.mouse.y}`"
      :text="`${viewport.mouse.pressed} ${viewport.mouse.button} ${viewport.mouse.target?.id} \n${viewport.mouse.moveX} x ${viewport.mouse.moveY}`"
      variant="text"
    /> -->
    <v-list v-model:opened="open">
      <v-list-group
        v-for="[group, plants] of Object.entries(grupedPlants)"
        :key="group"
        :value="group"
        :title="`${group}s`"
        variant="text"
      >
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <template v-slot:prepend>
              <PlantIcon :name="group" />
            </template>
            <template v-slot:title
              ><h2>
                {{ group.charAt(0).toUpperCase() + group.slice(1) }}s
              </h2></template
            >
          </v-list-item>
        </template>
        <v-card
          v-for="[id, plant] of plants.entries()"
          :key="id"
          :title="group"
          :subtitle="`${plant.position.x.toFixed()} x ${plant.position.y.toFixed()}`"
          variant="text"
          class="ml-4"
        >
          <template v-slot:prepend>
            <PlantIcon :name="group" size="1.2" />
          </template>
        </v-card>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<style scoped>
.info {
  position: fixed;
  right: 0;
  margin: 20px;
  max-height: calc(100vh - 40px);
  z-index: 2;
  touch-action: none;
  user-select: none;
}
</style>
