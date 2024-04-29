import plants from '@/plants';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';


export const toolbarStore = defineStore('toolbar', () => {
    const selected = ref<string>('default')
    const favoritePlants = ref<string[]>(
        Object.keys(plants).slice(0, 5))
    const replaceFavorite = (index: number, plant: string) => {
        favoritePlants.value.splice(index, 1, plant)
    }
    const otherPlants = computed(() => {
        return Object.keys(plants).filter(
            plant => !favoritePlants.value.includes(plant))
    })

    return {
        selected,
        favoritePlants,
        replaceFavorite,
        otherPlants
    }
})