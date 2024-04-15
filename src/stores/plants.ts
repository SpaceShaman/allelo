import { PlantedPlant } from '@/types';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const plantsStore = defineStore('plants', () => {
    const plantSize = ref(50)
    const planted = ref<PlantedPlant[]>([
        {
            id: 0,
            name: "carrot",
            position: { x: 400, y: 100 },
            selected: true,
        },
        {
            id: 1,
            name: "onion",
            position: { x: 400, y: 200 },
            selected: true,
        },
        {
            id: 2,
            name: "tomato",
            position: { x: 400, y: 400 },
            selected: false,
        },
        {
            id: 3,
            name: "cucumber",
            position: { x: 400, y: 600 },
            selected: false,
        },
        {
            id: 4,
            name: "cucumber",
            position: { x: 400, y: 800 },
            selected: false,
        },
        {
            id: 5,
            name: "strawberry",
            position: { x: 600, y: 100 },
            selected: false,
        },
    ])

    const selected = computed(() => {
        return planted.value.filter(plant => plant.selected)
    })

    const select = (id: number) => {
        const plant = planted.value.find(plant => plant.id === id)
        if (plant) {
            plant.selected = true
        }
    }

    const unselect = (id: number) => {
        const plant = planted.value.find(plant => plant.id === id)
        if (plant) {
            plant.selected = false
        }
    }

    const unselectAll = () => {
        planted.value.forEach(plant => plant.selected = false)
    }

    const getPlantById = (id: number) => {
        return planted.value.find(plant => plant.id === id)
    }

    const addPlant = (plant: string, x: number, y: number) => {
        planted.value.push({
            id: Date.now(),
            name: plant,
            position: { x, y },
            selected: false,
        })
    }

    const removePlant = (id: number) => {
        planted.value = planted.value.filter(plant => plant.id !== id)
    }

    return {
        plantSize,
        planted,
        selected,
        select,
        unselect,
        unselectAll,
        getPlantById,
        addPlant,
        removePlant,
    }
})
