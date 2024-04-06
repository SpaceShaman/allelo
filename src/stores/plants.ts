import { PlantOnGrid } from '@/types';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const plantsStore = defineStore('plants', () => {
    const plantSize = ref(50)
    const planted = ref<PlantOnGrid[]>([
        {
            id: 0,
            name: "carrot",
            position: { x: 400, y: 100 },
        },
        {
            id: 1,
            name: "onion",
            position: { x: 400, y: 200 },
        },
        {
            id: 2,
            name: "tomato",
            position: { x: 400, y: 400 },
        },
        {
            id: 3,
            name: "cucumber",
            position: { x: 400, y: 600 },
        },
        {
            id: 4,
            name: "cucumber",
            position: { x: 400, y: 800 },
        },
        {
            id: 5,
            name: "strawberry",
            position: { x: 600, y: 100 },
        },
    ])

    const getPlantById = (id: number) => {
        return planted.value.find(plant => plant.id === id)
    }

    const addPlant = (plant: string, x: number, y: number) => {
        planted.value.push({
            id: Date.now(),
            name: plant,
            position: { x, y }
        })
    }

    return {
        plantSize,
        planted,
        getPlantById,
        addPlant,
    }
})
