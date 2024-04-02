<script setup lang="ts">
import { useGridStore } from '@/stores/grid'
import interact from 'interactjs'

const grid = useGridStore()

function moveGrid(event: Interact.DragEvent) {
  grid.x = (grid.x + event.dx) % 10000
  grid.y = (grid.y + event.dy) % 10000
}

interact('.grid')
  .draggable({
    listeners: {
      move: moveGrid
    }
  })
  .styleCursor(false)

// Disable right-click context menu
// document.oncontextmenu = document.body.oncontextmenu = function () {
//   return false
// }
</script>

<template>
  <div
    class="grid"
    :style="{
      backgroundPosition: `${grid.x}px ${grid.y}px`,
      backgroundSize: `${grid.scale}px ${grid.scale}px`
    }"
  ></div>
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  background-image: url('../assets/grid.svg');
  background-repeat: repeat;
  cursor: crosshair;
  user-select: none;
  touch-action: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>
