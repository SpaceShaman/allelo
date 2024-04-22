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
const tab = ref<string>("positive");
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
        <v-list-group
          v-for="[id, plant] of plants.entries()"
          :key="id"
          :value="`${group}-${id}`"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <template v-slot:prepend>
                <PlantIcon :name="group" />
              </template>
              <template v-slot:title>
                {{ plant.name }}
                {{
                  `${plant.position.x.toFixed()} x ${plant.position.y.toFixed()}`
                }}
              </template>
            </v-list-item>
          </template>
          <v-list-item>
            <template v-slot:subtitle>
              <v-tabs v-model="tab">
                <v-tab value="positive">Positive</v-tab>
                <v-tab value="negative">Negative</v-tab>
              </v-tabs>
            </template>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="positive"> Positive </v-window-item>

                <v-window-item value="negative"> negative </v-window-item>
              </v-window>
            </v-card-text>
          </v-list-item>
        </v-list-group>
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
