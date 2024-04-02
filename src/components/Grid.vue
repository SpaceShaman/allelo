<script setup lang="ts">
import interact from 'interactjs'

let gridPosition = { x: 0, y: 0 }

function moveGrid(event) {
  gridPosition.x = (gridPosition.x + event.dx) % 100 // 200 to wielkość obrazu kafelka
  gridPosition.y = (gridPosition.y + event.dy) % 100
  event.target.style.backgroundPosition = `${gridPosition.x}px ${gridPosition.y}px`
}

interact('.grid')
  .draggable({
    listeners: {
      move: moveGrid
    }
  })
  .on('down', function (event) {
    if (event.button === 2) {
      event.interaction.start({ name: 'drag' }, event.interactable, event.currentTarget)
    }
  })
  .styleCursor(false)
</script>

<template>
  <div class="grid"></div>
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100%;
  background-image: url('../assets/grid.svg');
  background-size: 100px 100px;
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
