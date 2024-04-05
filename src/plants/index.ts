import { Plant } from '@/types';

const plants: Plant[] = [
    {
        name: 'onion',
        type: 'vegetable',
        friends: [
            {
                name: 'carrot',
                reason: 'grows well together',
                growthSpeed: 1
            },
            {
                name: 'lettuce',
                reason: 'grows well together',
                growthSpeed: 2
            }
        ],
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