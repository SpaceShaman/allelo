import { useMouse } from '@vueuse/core';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

const realMouse = useMouse()

export const viewportStore = defineStore('viewport', () => {
    const x = ref(0)
    const y = ref(0)
    const scale = ref(1)
    const plantSize = ref(50)
    const gridSize = ref(25)
    const mouse = {
        x: computed(() => (realMouse.x.value - x.value)),
        y: computed(() => (realMouse.y.value - y.value)),
    }

    return {
        x,
        y,
        scale,
        plantSize,
        gridSize,
        mouse
    }
})