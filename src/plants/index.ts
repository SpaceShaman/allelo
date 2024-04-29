import { Plant } from '@/types';

const plants: { [name: string]: Plant } = {
    'broccoli': {
        friends: ['bean', 'beetroot', 'chives', 'carrot', 'dill', 'sage', 'thyme', 'oregano'],
        enemies: ['pepper', 'strawberry', 'pumpkin', 'tomato']
    },
    'carrot': {
        friends: ['bean', 'peas', 'pepper', 'lettuce', 'onion'],
        enemies: ['dill']
    },
    'parsley': {
        friends: ['chives', 'carrot', 'corn', 'onion', 'sage', 'thyme', 'pepper', 'tomato', 'spinach', 'asparagus '],
        enemies: ['mint', 'fennel', 'dill', 'coriander']
    },
    'pepper': {
        friends: ['basil', 'carrot', 'parsley', 'pumpkin'],
        enemies: ['broccoli', 'cabbage', 'dill']
    },
    'radish': {
        friends: ['beetroot', 'cucumbers', 'peas', 'lettuce', 'spinach', 'pumpkin'],
        enemies: ['hyssops', 'potato', 'turnips']
    },
    'tomato': {
        friends: ['bean', 'basil', 'carrot', 'cucumber', 'marigold', 'thyme', 'sage', 'parsley'],
        enemies: ['corn', 'dill', 'potato']
    },
    'asparagus': {
        friends: ['tomato', 'eggplant', 'strawberry', 'basil', 'dill', 'nasturtium'],
        enemies: ['potato', 'carrot']
    },
    'basil': {
        friends: ['oregano', 'tomato', 'pepper']
    },
    'bean': {
        friends: ['radish', 'cucumbers', 'cabbage', 'carrot', 'corn', 'beetroot', 'peas'],
        enemies: ['onion', 'garlic', 'chives']
    },
    'beetroot': {
        friends: ['bean', 'cabbage', 'onion', 'lettuce', 'garlic']
    },
    'cabbage': {
        friends: ['beetroot', 'lettuce', 'onion', 'spinach'],
        enemies: ['tomato', 'pepper']
    },
    'cauliflower': {
        friends: ['onion', 'mint', 'hyssop', 'potato', 'dill'],
        enemies: ['strawberry', 'corn', 'tomato', 'pumpkin', 'peas']
    },
    'corn': {
        friends: ['cucumber', 'bean', 'parsley', 'peas', 'sage'],
        enemies: ['tomato']
    },
    'cucumber': {
        friends: ['bean', 'corn', 'lettuce', 'dill', 'onion', 'peas', 'tomato', 'nasturtiums '],
        enemies: ['sage ']
    },
    'dill': {
        friends: ['corn', 'cucumber', 'lettuce', 'onion', 'cabbage'],
        enemies: ['tomato', 'carrot', 'cilantro', 'pepper', 'lavender']
    },
    'melon': {
        friends: ['nasturtium', 'radish', 'lettuce', 'tansy', 'corn', 'bean'],
        enemies: ['potato', 'cucumber', 'watermelon']
    },
    'onion': {
        friends: ['carrot', 'cabbage', 'lettuce', 'tomato'],
        enemies: ['peas', 'bean', 'leeks']
    },
    'potato': {
        friends: ['bean', 'cabbage', 'aubergine', 'marigold', 'coriander'],
        enemies: ['pumpkin', 'cucumber', 'tomato', 'melon']
    },
    'peas': {
        friends: ['bean', 'carrot', 'celery', 'radish', 'spinach', 'parsley', 'strawberry'],
        enemies: ['onion', 'garlic']
    },
    'raspberry': {
        friends: ['nasturtiums', 'chervil', 'peas'],
        enemies: ['tomato', 'eggplants', 'beetroot']
    },
    'rhubarb': {
        friends: ['strawberry', 'bean', 'sage', 'beetrootroots', 'garlic'],
        enemies: ['melon', 'cucumber', 'walnut']
    },
    'spinach': {
        friends: ['radish', 'lettuce', 'bean', 'carrot'],
        enemies: ['strawberry', 'broccoli', 'nightshades', 'melon']
    },
    'pumpkin': {
        friends: ['corn', 'lettuce', 'nasturtiums', 'peas', 'pepper', 'melon'],
        enemies: ['cabbage']
    },
    'strawberry': {
        friends: ['bean', 'garlic', 'peas', 'lettuce', 'onion', 'sage', 'spinach', 'thyme'],
        enemies: ['cabbage', 'potato']
    },
    'turnip': {
        friends: ['beetroot', 'carrot', 'onion', 'chives', 'spinach'],
        enemies: ['kohlrabi', 'mustard greens', 'radish', 'cabbages', 'potato']
    },
    'mint': {
        friends: ['carrot', 'tomato', 'pumpkin'],
        enemies: ['parsley', 'chamomile', 'rosemary', 'strawberry']
    },
    'oregano': {
        friends: ['basil', 'sage', 'thyme', 'cabbage', 'rosemary'],
        enemies: ['lettuce', 'collards', 'mint', 'chives', 'raspberries']
    },
    'sage': {
        friends: ['broccoli', 'corn', 'parsley', 'strawberry', 'tomato'],
        enemies: ['cucumber', 'basil', 'rue', 'fennel']
    },
};

export default plants;