export interface Plant {
    name: string;
    type: string;
    friends?: {
        name: string;
        reason: string;
        growthSpeed?: number;
    }[];
}