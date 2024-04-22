import { PlantedPlant } from '@/types';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const plantsStore = defineStore('plants', () => {
    const plantSize = ref(50)
    const planted = ref<Record<number, PlantedPlant>>({})

    const selected = computed(() => {
        return Object.values(planted.value).filter(plant => plant.selected)
    })

    const select = (id: number) => {
        planted.value[id].selected = true
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
        for (const [id, plant] of Object.entries(planted.value)) {
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
                select(Number(id));
            }
        }
    }

    const selectInGrowingBed = (bedId: number, viewportX: number, viewportY: number, viewportScale: number) => {
        for (const [id, plant] of Object.entries(planted.value)) {
            const elementsAtPoint = document.elementsFromPoint(plant.position.x * viewportScale + viewportX, plant.position.y * viewportScale + viewportY);
            const bedPolygon = elementsAtPoint.find(element => element.getAttribute('class') === 'growing-bed-polygon');
            const bed = bedPolygon?.parentElement;
            if (bed?.getAttribute('id') === `bed-${bedId}`) {
                select(Number(id));
            }
        }
    }

    const selectAll = () => {
        for (const id in planted.value) {
            select(Number(id));
        }
    }

    const unselect = (id: number) => {
        planted.value[id].selected = false
    }

    const unselectAll = () => {
        for (const id in planted.value) {
            unselect(Number(id));
        }
    }

    const add = (plant: string, position: { x: number, y: number }) => {
        planted.value[Date.now()] = {
            name: plant,
            position: position,
            selected: false,
        }
    }

    const remove = (id: number) => {
        delete planted.value[id]
    }

    const removeSelected = () => {
        for (const [id, plant] of Object.entries(planted.value)) {
            if (plant.selected) {
                remove(Number(id));
            }
        }
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
        add,
        remove,
        removeSelected,
        movePlants,
    }
})
