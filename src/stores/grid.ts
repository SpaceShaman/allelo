import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGridStore = defineStore('grid', () => {
  const x = ref<number>(0)
  const y = ref<number>(0)
  const size = ref<number>(50)

  return {
    x,
    y,
    size
  }
})
