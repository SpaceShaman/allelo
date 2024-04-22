import { Plant } from '@/types';

const plants: { [name: string]: Plant } = {
    'broccoli': {
        positive: ['carrot', 'pepper'],
        negative: ['radish', 'tomato']
    },
    'carrot': {
        positive: ['broccoli', 'parsley'],
        negative: ['tomato']
    },
    'parsley': {
        positive: ['carrot'],
        negative: ['broccoli']
    },
    'pepper': {
        positive: ['broccoli'],
        negative: ['parsley']
    },
    'radish': {
        positive: ['parsley', 'tomato'],
        negative: ['broccoli']
    },
    'tomato': {
        positive: ['radish'],
        negative: ['carrot']
    }
};

export default plants;