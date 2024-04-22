import { Plant } from '@/types';

const plants: Plant[] = [
    {
        name: 'broccoli',
        positive: ['carrot', 'pepper'],
        negative: ['radish', 'tomato']
    },
    {
        name: 'carrot',
        positive: ['broccoli', 'parsley'],
        negative: ['tomato']
    },
    {
        name: 'parsley',
        positive: ['carrot'],
        negative: ['broccoli']
    },
    {
        name: 'pepper',
        positive: ['broccoli'],
        negative: ['parsley']
    },
    {
        name: 'radish',
        positive: ['parsley', 'tomato'],
        negative: ['broccoli']
    },
    {
        name: 'tomato',
        positive: ['radish'],
        negative: ['carrot']
    }
];

export default plants;