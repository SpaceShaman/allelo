<script setup lang="ts">
import GridBackground from '@/components/GridBackground.vue'
import { useGridPositionStore } from '@/stores/gridPosition'
import interact from 'interactjs'
import { ref } from 'vue'

const gridPosition = useGridPositionStore()

const plants = ref([
  {
    name: 'carrot',
    position: { x: 100, y: 100 }
  },
  {
    name: 'onion',
    position: { x: 100, y: 200 }
  },
  {
    name: 'tomato',
    position: { x: 100, y: 300 }
  },
  {
    name: 'cucumber',
    position: { x: 100, y: 400 }
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
      }
    },
    modifiers: [
      interact.modifiers.snap({
        targets: [interact.createSnapGrid({ x: 50, y: 50 })],
        range: Infinity,
        relativePoints: [{ x: gridPosition.x, y: gridPosition.y }]
      })
    ]
  })
  .styleCursor(false)

// watch(gridPosition, () => {
//   plants.value.forEach((plant) => {
//     plant.position.x += gridPosition.x
//     plant.position.y += gridPosition.y
//   })
// })
</script>

<template>
  <div class="info">
    <div v-for="plant in plants" :key="plant.name" class="plant-info">
      <p>{{ plant.name }}</p>
      <p>{{ plant.position.x }} x {{ plant.position.y }}</p>
    </div>
    <div class="plant-info">
      <p>Grid</p>
      <p>{{ gridPosition.x }} x {{ gridPosition.y }}</p>
    </div>
  </div>
  <img
    v-for="plant in plants"
    :key="plant.name"
    :id="plant.name"
    :src="getPlantImg(plant.name)"
    class="plant"
    :style="{
      transform: `translate(${plant.position.x + gridPosition.x}px, ${plant.position.y + gridPosition.y}px)`
    }"
  />
  <GridBackground />
</template>

<style scoped>
.plant {
  width: 50px;
  touch-action: none;
  user-select: none;
  cursor: grab;
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
