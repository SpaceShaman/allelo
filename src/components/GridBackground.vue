<script setup lang="ts">
import { useGridPositionStore } from '@/stores/gridPosition'
import interact from 'interactjs'

const gridPosition = useGridPositionStore()

function moveGrid(event: Interact.DragEvent) {
  gridPosition.x = (gridPosition.x + event.dx) % 10000
  gridPosition.y = (gridPosition.y + event.dy) % 10000

  event.target.style.backgroundPosition = `${gridPosition.x}px ${gridPosition.y}px`
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
  <div class="grid"></div>
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  background-image: url('../assets/grid.svg');
  background-size: 50px 50px;
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
