import { PlantOnGrid } from '@/types';
import { defineStore } from "pinia";
import { ref } from 'vue';

export const usePlantedStore = defineStore('plants', () => {
    const planted = ref<PlantOnGrid[]>([])
    return {
        planted
    }
})
