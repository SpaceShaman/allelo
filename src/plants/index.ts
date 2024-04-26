import { Plant } from '@/types';

const plants: { [name: string]: Plant } = {
    'broccoli': {
        friends: ['carrot', 'pepper'],
        enemies: ['radish', 'tomato']
    },
    'carrot': {
        friends: ['broccoli', 'parsley'],
        enemies: ['tomato']
    },
    'carrot_new': {
        friends: ['broccoli', 'parsley'],
        enemies: ['tomato']
    },
    'parsley': {
        friends: ['carrot'],
        enemies: ['broccoli']
    },
    'pepper': {
        friends: ['broccoli'],
        enemies: ['parsley']
    },
    'radish': {
        friends: ['parsley', 'tomato'],
        enemies: ['broccoli']
    },
    'tomato': {
        friends: ['radish'],
        enemies: ['carrot']
    }
};

export default plants;