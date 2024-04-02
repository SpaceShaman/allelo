import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGridPositionStore = defineStore('gridPosition', () => {
  const x = ref<number>(0)
  const y = ref<number>(0)

  return {
    x,
    y
  }
})
