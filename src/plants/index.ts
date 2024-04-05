import { Plant } from '@/types';

const plants: Plant[] = [
    {
        name: 'onion',
        type: 'vegetable',
        friends: [
            {
                name: 'carrot',
                reason: 'grows well together',
                range: 4,
                growthSpeed: 1
            },
            {
                name: 'cucumber',
                reason: 'grows well together',
                range: 3,
                growthSpeed: 2
            }
        ],
        enemies: [
            {
                name: 'tomato',
                reason: 'grows poorly together',
                range: 5,
                growthSpeed: -0.5
            },
            {
                name: 'strawberry',
                reason: 'grows poorly together',
                range: 3,
                growthSpeed: -1
            }
        ]
    },
    {
        name: 'carrot',
        type: 'vegetable',
    },
    {
        name: 'cucumber',
        type: 'vegetable',
    },
    {
        name: 'tomato',
        type: 'fruit',
    },
    {
        name: 'strawberry',
        type: 'fruit',
    }
];

export default plants;