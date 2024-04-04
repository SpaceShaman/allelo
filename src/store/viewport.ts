import { defineStore } from "pinia";
import { ref } from 'vue';

export const viewportStore = defineStore('viewport', () => {
    const x = ref(0)
    const y = ref(0)
    const scale = ref(1)
    const plantSize = ref(50)
    const gridSize = ref(25)

    return {
        x,
        y,
        scale,
        plantSize,
        gridSize
    }
})