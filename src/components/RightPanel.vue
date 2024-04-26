<script setup lang="ts">
import { inputStore, plantsStore, viewportStore } from "@/stores";
import { PlantedPlant } from "@/types";
import { computed, ref } from "vue";

const viewport = viewportStore();
const plants = plantsStore();
const input = inputStore();

const grupedPlants = computed(() => {
  const grouped: Record<string, PlantedPlant[]> = {};
  for (const [id, plant] of Object.entries(plants.planted)) {
    if (!grouped[plant.name]) {
      grouped[plant.name] = [];
    }
    grouped[plant.name].push(plant);
  }
  return grouped;
});

const tab = ref<string>();
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
    <v-list density="compact" slim>
      <!-- <v-list v-model:opened="open" density="compact" slim> -->
      <v-list-subheader>Planted</v-list-subheader>
      <v-list-group
        v-for="[group, plantsOnList] of Object.entries(grupedPlants)"
        :key="group"
        :value="group"
        :title="`${group}s`"
        variant="text"
      >
        <template v-slot:activator="{ props }">
          <v-list-item>
            <template v-slot:prepend>
              <PlantIcon :name="group" />
            </template>
            <template v-slot:title>
              <h3
                :style="{
                  color: plantsOnList.some((plant) => plant.selected)
                    ? 'rgb(var(--v-theme-primary))'
                    : 'inherit',
                }"
                @mouseover="
                  plantsOnList.forEach((plant) => {
                    if (plant.name === group) plant.hovered = true;
                  })
                "
                @mouseleave="
                  plantsOnList.forEach((plant) => {
                    plant.hovered = false;
                  })
                "
                @click="
                  if (!input.keyboard.ctrl) plants.unselectAll();
                  plantsOnList.forEach((plant) => {
                    if (plant.name === group) {
                      plant.selected = true;
                      plant.hovered = false;
                    }
                  });
                "
              >
                {{ group.charAt(0).toUpperCase() + group.slice(1) }}s ({{
                  plantsOnList.length
                }})
              </h3>
            </template>
            <template v-slot:append>
              <v-icon @click="props.onClick"> </v-icon>
            </template>
          </v-list-item>
        </template>
        <v-list-group
          v-for="[id, plant] of plantsOnList.entries()"
          :key="id"
          :value="`${group}-${id}`"
        >
          <template v-slot:activator="{ props }">
            <v-list-item>
              <template v-slot:prepend>
                <PlantIcon :name="group" />
              </template>
              <template v-slot:title>
                <p
                  :style="{
                    color: plant.selected
                      ? 'rgb(var(--v-theme-primary))'
                      : 'inherit',
                  }"
                  @mouseover="plant.hovered = true"
                  @mouseleave="plant.hovered = false"
                  @click="
                    if (!input.keyboard.ctrl) plants.unselectAll();
                    plant.selected = true;
                    plant.hovered = false;
                  "
                >
                  {{ plant.name }}
                  {{
                    `${plant.position.x.toFixed()} x ${plant.position.y.toFixed()}`
                  }}
                </p>
              </template>
              <template v-slot:append>
                <v-icon @click="props.onClick"> </v-icon>
              </template>
            </v-list-item>
          </template>
          <v-list-item>
            <template v-slot:subtitle>
              <v-tabs v-model="tab" fixed-tabs>
                <v-tab
                  value="friends"
                  color="green"
                  @mouseover="
                    if (plant.friends) {
                      plant.friends.forEach((friend) => {
                        friend.hovered = true;
                      });
                    }
                  "
                  @mouseleave="
                    if (plant.friends) {
                      plant.friends.forEach((friend) => {
                        friend.hovered = false;
                      });
                    }
                  "
                >
                  Friends
                </v-tab>
                <v-tab
                  value="enemies"
                  color="red"
                  @mouseover="
                    if (plant.enemies) {
                      plant.enemies.forEach((enemy) => {
                        enemy.hovered = true;
                      });
                    }
                  "
                  @mouseleave="
                    if (plant.enemies) {
                      plant.enemies.forEach((enemy) => {
                        enemy.hovered = false;
                      });
                    }
                  "
                >
                  Enemies
                </v-tab>
              </v-tabs>
            </template>

            <v-card-text>
              <v-window v-model="tab">
                <v-window-item value="friends">
                  <div
                    v-if="plant.friends"
                    v-for="[id, friend] of plant.friends.entries()"
                    :key="id"
                  >
                    <v-list-item
                      @mouseover="friend.hovered = true"
                      @mouseleave="friend.hovered = false"
                      @click="
                        if (!input.keyboard.ctrl) plants.unselectAll();
                        friend.selected = true;
                        friend.hovered = false;
                      "
                    >
                      <template v-slot:title>
                        <p
                          :style="{
                            color: friend.selected
                              ? 'rgb(var(--v-theme-primary))'
                              : 'inherit',
                          }"
                        >
                          {{ friend.name }}
                        </p>
                      </template>
                      <template v-slot:prepend>
                        <PlantIcon :name="friend.name" />
                      </template>
                    </v-list-item>
                  </div>
                </v-window-item>

                <v-window-item value="enemies">
                  <p
                    v-if="plant.enemies"
                    v-for="[id, enemy] of plant.enemies.entries()"
                    :key="id"
                  >
                    <v-list-item
                      @mouseover="enemy.hovered = true"
                      @mouseleave="enemy.hovered = false"
                      @click="
                        if (!input.keyboard.ctrl) plants.unselectAll();
                        enemy.selected = true;
                        enemy.hovered = false;
                      "
                    >
                      <template v-slot:title>
                        <p
                          :style="{
                            color: enemy.selected
                              ? 'rgb(var(--v-theme-primary))'
                              : 'inherit',
                          }"
                        >
                          {{ enemy.name }}
                        </p>
                      </template>
                      <template v-slot:prepend>
                        <PlantIcon :name="enemy.name" />
                      </template>
                    </v-list-item>
                  </p>
                </v-window-item>
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
