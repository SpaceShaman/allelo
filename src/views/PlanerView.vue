<script setup lang="ts">
import interact from 'interactjs'

const position = { x: 0, y: 0 }

interact('.plant')
  .draggable({
    listeners: {
      start(event) {
        console.log(event.type, event.target)
      },
      move(event) {
        position.x += event.dx
        position.y += event.dy

        event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
      }
    }
  })
  .styleCursor(false)
</script>

<template>
  <main>
    <h1>Home</h1>
    <img alt="Carrot" class="plant" src="@/assets/plants/carrot.svg" width="100" />
  </main>
</template>

<style scoped>
.plant {
  width: 100px;
  touch-action: none;
  user-select: none;
  cursor: grab;
  padding: 100px;
  border-radius: 50%;
  background-color: rgba(0, 255, 13, 0.5);
}
</style>
