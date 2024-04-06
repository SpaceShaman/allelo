import { defineStore } from "pinia";
import { ref } from 'vue';

export const toolbarStore = defineStore('toolbar', () => {
    const selected = ref<string>('move')

    return {
        selected,
    }
})