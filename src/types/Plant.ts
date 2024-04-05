export interface Plant {
    name: string;
    type: string;
    friends?: {
        name: string;
        reason: string;
        range: number;
        growthSpeed?: number;
    }[];
    enemies?: {
        name: string;
        reason: string;
        range: number;
        growthSpeed?: number;
    }[];
}