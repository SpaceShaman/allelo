import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGridStore = defineStore('grid', () => {
  const x = ref<number>(0)
  const y = ref<number>(0)
  const scale = 50

  return {
    x,
    y,
    scale
  }
})
