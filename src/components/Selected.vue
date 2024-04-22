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
    <v-list v-model:opened="open" density="compact" slim>
      <v-list-subheader>Selected</v-list-subheader>
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
            <template v-slot:title>
              <h3>
                {{ group.charAt(0).toUpperCase() + group.slice(1) }}s ({{
                  plants.length
                }})
              </h3>
            </template>
          </v-list-item>
        </template>
        <v-list-group
          v-for="[id, plant] of plants.entries()"
          :key="id"
          :value="`${group}-${id}`"
        >
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" slim>
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
              <v-tabs v-model="tab" fixed-tabs>
                <v-tab value="friends" color="green">Friends</v-tab>
                <v-tab value="enemys" color="red">Enemys</v-tab>
              </v-tabs>
            </template>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="friends"> Positive </v-window-item>

                <v-window-item value="enemys"> enemys </v-window-item>
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
  width: 300px;
  max-height: calc(100vh - 40px);
  z-index: 2;
  touch-action: none;
  user-select: none;
}
.v-list-group__items .v-list-item {
  padding-left: 16px !important;
}
.v-list-item {
  padding-left: 16px !important;
}
</style>
