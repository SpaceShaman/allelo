import { defineStore } from "pinia";
import { ref } from 'vue';

export const viewportStore = defineStore('viewport', () => {
    const x = ref(0)
    const y = ref(0)
    const scale = ref(1)
    const gridSize = ref(25)
    const selectArea = {
        startX: ref(0),
        startY: ref(0),
        endX: ref(0),
        endY: ref(0),
    }

    return {
        x,
        y,
        scale,
        gridSize,
        selectArea,
    }
})