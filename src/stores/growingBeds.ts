import { GrowingBed } from '@/types';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const growingBedsStore = defineStore('growingBeds', () => {
    const beds = ref<GrowingBed[]>([]);

    const add = (startX: number, startY: number, endX: number, endY: number) => {
        beds.value.push({
            id: Date.now(),
            polygons: [
                { x: startX, y: startY },
                { x: endX, y: startY },
                { x: endX, y: endY },
                { x: startX, y: endY }
            ]
        });
    }

    return {
        beds,
        add
    }
})
