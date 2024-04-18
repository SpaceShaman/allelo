import { GrowingBed } from '@/types';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const growingBedsStore = defineStore('growingBeds', () => {
    const beds = ref<GrowingBed[]>([]);

    const add = (startX: number, startY: number, endX: number, endY: number) => {
        beds.value.push({
            id: Date.now(),
            corners: [
                { id: Date.now(), x: startX, y: startY, selected: false}, 
                { id: Date.now() + 1, x: endX, y: startY, selected: false },
                { id: Date.now() + 2, x: endX, y: endY, selected: false },
                { id: Date.now() + 3, x: startX, y: endY, selected: false }
            ]
        });
    }

    const selectedCorners = computed(() => {
        return beds.value.flatMap(bed => bed.corners.filter(corner => corner.selected));
    })

    const selectCorner = (bedId: number, cornerId: number) => {
        const bed = beds.value.find(bed => bed.id === bedId);
        if (bed) {
            const corner = bed.corners.find(corner => corner.id === cornerId);
            if (corner) {
                corner.selected = true;
            }
        }
    }

    const selectBed = (bedId: number) => {
        beds.value.forEach(bed => {
            bed.corners.forEach(corner => {
                corner.selected = bed.id === bedId;
            });
        });
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
        beds.value.forEach(bed => {
            bed.corners.forEach(corner => {
                const cornerX = corner.x * viewportScale + viewportX;
                const cornerY = corner.y * viewportScale + viewportY;
                if (startX > endX) {
                    [startX, endX] = [endX, startX];
                }
                if (startY > endY) {
                    [startY, endY] = [endY, startY];
                }
                if (
                    cornerX > startX &&
                    cornerX < endX &&
                    cornerY > startY &&
                    cornerY < endY
                ) {
                    corner.selected = true;
                }
            });
        });
    }

    const unselectAllCorners = () => {
        beds.value.forEach(bed => {
            bed.corners.forEach(corner => {
                corner.selected = false;
            });
        });
    }

    const moveCorners = (dx: number, dy: number, viewportScale: number) => {
        selectedCorners.value.forEach(corner => {
            corner.x += dx / viewportScale;
            corner.y += dy / viewportScale;
        });
    }

    return {
        beds,
        add,
        selectedCorners,
        selectCorner,
        selectBed,
        selectArea,
        unselectAllCorners,
        moveCorners
    }
})
