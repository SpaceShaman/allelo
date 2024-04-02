<script setup lang="ts">
import GridBackground from '@/components/GridBackground.vue'
import { useGridStore } from '@/stores/grid'
import interact from 'interactjs'
import { ref, watch } from 'vue'

const grid = useGridStore()

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

function createInteractInstance() {
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
          targets: [
            interact.createSnapGrid({
              x: grid.scale,
              y: grid.scale,
              offset: { x: grid.x, y: grid.y }
            })
          ],
          relativePoints: [{ x: 0, y: 0 }]
        })
      ]
    })
    .styleCursor(false)
}
watch(grid, () => {
  createInteractInstance()
})
createInteractInstance()

// const handleWheel = (event) => {
//   event.preventDefault()
//   grid.scale += event.deltaY * -0.001
//   // Ogranicz skalę
//   grid.scale = Math.min(Math.max(0.001, grid.scale), 2)
// }

// window.addEventListener('wheel', handleWheel, { passive: false })
</script>

<template>
  <div class="info">
    <div v-for="plant in plants" :key="plant.name" class="plant-info">
      <p>{{ plant.name }}</p>
      <p>{{ plant.position.x }} x {{ plant.position.y }}</p>
    </div>
    <div class="plant-info">
      <p>Grid</p>
      <p>{{ grid.x }} x {{ grid.y }}</p>
    </div>
  </div>
  <img
    v-for="plant in plants"
    :key="plant.name"
    :id="plant.name"
    :src="getPlantImg(plant.name)"
    class="plant"
    :style="{
      transform: `translate(${plant.position.x + grid.x}px, ${plant.position.y + grid.y}px)`,
      width: `${grid.scale}px`
    }"
  />
  <GridBackground />
</template>

<style scoped>
.plant {
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
