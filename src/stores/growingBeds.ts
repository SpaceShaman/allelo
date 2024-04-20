import { GrowingBed } from '@/types';
import { defineStore } from "pinia";
import { computed, ref } from 'vue';

export const growingBedsStore = defineStore('growingBeds', () => {
    const beds = ref<GrowingBed[]>([]);

    const addBed = (start: { x: number, y: number }, end: { x: number, y: number }) => {
        beds.value.push({
            id: Date.now(),
            corners: [
                { id: Date.now(), x: start.x, y: start.y, selected: false },
                { id: Date.now() + 1, x: end.x, y: start.y, selected: false },
                { id: Date.now() + 2, x: end.x, y: end.y, selected: false },
                { id: Date.now() + 3, x: start.x, y: end.y, selected: false }
            ]
        });
    }

    const addCorner = (bedId: number, x: number, y: number) => {
        const bed = beds.value.find(bed => bed.id === bedId);
        if (!bed) {
            return;
        }
        // Find two closest corners
        const distances = bed.corners.map(corner => {
            return Math.sqrt((corner.x - x) ** 2 + (corner.y - y) ** 2);
        });
        const minDistance = Math.min(...distances);
        const closestCornerIndex = distances.indexOf(minDistance);
        const nextCornerIndex = (closestCornerIndex + 1) % bed.corners.length;
        // Insert the new corner between the two closest corners
        const newCorner = {
            id: Date.now(),
            x: x,
            y: y,
            selected: false
        };
        bed.corners.splice(nextCornerIndex, 0, newCorner);
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
                if (bed.id === bedId) {
                    corner.selected = true;
                }
            });
        });
    }

    const selectAll = () => {
        beds.value.forEach(bed => {
            bed.corners.forEach(corner => {
                corner.selected = true;
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

    const removeBed = (bedId: number) => {
        beds.value = beds.value.filter(bed => bed.id !== bedId);
    }

    const removeCorner = (bedId: number, cornerId: number) => {
        const bed = beds.value.find(bed => bed.id === bedId);
        if (!bed) {
            return;
        }
        bed.corners = bed.corners.filter(corner => corner.id !== cornerId);
        // Remove the bed if it has less than 3 corners
        if (bed.corners.length < 3) {
            removeBed(bedId);
        }
    }

    const removeSelectedCorners = () => {
        beds.value.forEach(bed => {
            bed.corners = bed.corners.filter(corner => !corner.selected);
            // Remove beds with less than 3 corners
            if (bed.corners.length < 3) {
                removeBed(bed.id);
            }
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
        addBed,
        addCorner,
        selectedCorners,
        selectCorner,
        selectBed,
        selectAll,
        selectArea,
        unselectAllCorners,
        removeCorner,
        removeSelectedCorners,
        moveCorners
    }
})
