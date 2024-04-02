<script setup lang="ts">
import Grid from '@/components/Grid.vue'
import interact from 'interactjs'
import { ref } from 'vue'

const plants = ref([
  {
    name: 'carrot',
    position: { x: 0, y: 0 }
  },
  {
    name: 'onion',
    position: { x: 0, y: 100 }
  },
  {
    name: 'tomato',
    position: { x: 0, y: 200 }
  },
  {
    name: 'cucumber',
    position: { x: 0, y: 300 }
  }
])

function getPlantImg(plant: string): string {
  return new URL(`../assets/plants/${plant}.svg`, import.meta.url).href
}

interact('.plant')
  .draggable({
    listeners: {
      move(event) {
        const plant = plants.value.find((plant) => plant.name === event.target.id)
        if (!plant) return
        plant.position.x += event.dx
        plant.position.y += event.dy
        event.target.style.transform = `translate(${plant.position.x}px, ${plant.position.y}px)`
      }
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [interact.createSnapGrid({ x: 50, y: 50 })],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
      })
    ]
  })
  .styleCursor(false)
</script>

<template>
  <div class="info">
    <div v-for="plant in plants" :key="plant.name" class="plant-info">
      <p>{{ plant.name }}</p>
      <p>{{ plant.position.x }} x {{ plant.position.y }}</p>
    </div>
  </div>
  <img
    v-for="plant in plants"
    :key="plant.name"
    :id="plant.name"
    :src="getPlantImg(plant.name)"
    class="plant"
    :style="{ transform: `translate(${plant.position.x}px, ${plant.position.y}px)` }"
  />
  <Grid />
</template>

<style scoped>
.plant {
  width: 100px;
  touch-action: none;
  user-select: none;
  cursor: grab;
  padding: 50px;
  border-radius: 50%;
  background-color: rgba(0, 255, 13, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.info {
  position: fixed;
  top: 0;
  right: 0;
  background-color: rgba(53, 190, 25, 0.5);
}
.plant-info {
  display: inline-block;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
