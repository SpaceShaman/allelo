export function getPlantSvg(plant: string): string {
    return new URL(`../assets/plants/${plant}.svg`, import.meta.url).href
}
