import { PlantedPlant } from '@/types';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const plantsStore = defineStore('plants', () => {
    const plantSize = ref(50)
    const planted = ref<PlantedPlant[]>([])

    const selected = computed(() => {
        return planted.value.filter(plant => plant.selected)
    })

    const select = (id: number) => {
        const plant = planted.value.find(plant => plant.id === id)
        if (plant) {
            plant.selected = true
        }
    }

    const selectArea = (
        startX: number,
        startY: number,
        endX: number,
        endY: number,
        viewportX: number,
        viewportY: number,
        viewportScale: number
    ) => {
        planted.value.forEach((plant: PlantedPlant) => {
            const plantX = plant.position.x * viewportScale + viewportX;
            const plantY = plant.position.y * viewportScale + viewportY;
            const size = plantSize.value * viewportScale;
            if (startX > endX) {
                [startX, endX] = [endX, startX];
            }
            if (startY > endY) {
                [startY, endY] = [endY, startY];
            }
            if (
                plantX > startX - size / 2 &&
                plantX < endX + size / 2 &&
                plantY > startY - size / 2 &&
                plantY < endY + size / 2
            ) {
                select(plant.id);
            }
        });
    }

    const selectInGrowingBed = (bedId: number, viewportX: number, viewportY: number, viewportScale: number) => {
        planted.value.forEach(plant => {
            const elementsAtPoint = document.elementsFromPoint(plant.position.x * viewportScale + viewportX, plant.position.y * viewportScale + viewportY);
            const bedPolygon = elementsAtPoint.find(element => element.getAttribute('class') === 'growing-bed-polygon');
            const bed = bedPolygon?.parentElement;
            if (bed?.getAttribute('id') === `bed-${bedId}`) {
                select(plant.id);
            }
        })
    }

    const selectAll = () => {
        planted.value.forEach(plant => plant.selected = true)
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

    const add = (plant: string, x: number, y: number) => {
        planted.value.push({
            id: Date.now(),
            name: plant,
            position: { x, y },
            selected: false,
        })
    }

    const remove = (id: number) => {
        planted.value = planted.value.filter(plant => plant.id !== id)
    }

    const removeSelected = () => {
        planted.value = planted.value.filter(plant => !plant.selected)
    }

    const movePlants = (dx: number, dy: number, viewportScale: number) => {
        selected.value.forEach((plant: PlantedPlant) => {
            plant.position.x += dx / viewportScale;
            plant.position.y += dy / viewportScale;
        });
    }

    return {
        plantSize,
        planted,
        selected,
        select,
        selectArea,
        selectInGrowingBed,
        selectAll,
        unselect,
        unselectAll,
        getPlantById,
        addPlant: add,
        remove,
        removeSelected,
        movePlants,
    }
})
