export interface PlantedPlant {
    name: string;
    position: {
        x: number;
        y: number;
    };
    selected: boolean;
    hovered: boolean;
    friends?: PlantedPlant[];
    enemies?: PlantedPlant[];
}