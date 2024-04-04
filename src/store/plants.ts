import { Plant } from '@/types';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const plantsStore = defineStore('plants', () => {
    const planted = ref<Plant[]>([
        {
            id: 0,
            name: "carrot",
            position: { x: 5, y: 2 },
        },
        {
            id: 1,
            name: "onion",
            position: { x: 5, y: 4 },
        },
        {
            id: 2,
            name: "tomato",
            position: { x: 5, y: 6 },
        },
        {
            id: 3,
            name: "cucumber",
            position: { x: 5, y: 8 },
        },
    ])

    return {
        planted
    }
})