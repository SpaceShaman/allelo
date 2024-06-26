# Allelo - Application for allelopathic garden planning

Allelo is a web application that helps gardeners plan their garden by graphically drawing the garden and placing plants on it.
The application will show the user which plants are compatible with each other and which are not. This is a preliminary version of the application, and it is still under development. You can see the current version of the application [here](https://spaceshaman.github.io/allelo/).

https://github.com/SpaceShaman/allelo/assets/1573423/c79b7b9d-5a19-41aa-a419-8eca97361fdc

## Features

- Put plants on the garden
- Show compatibility between plants (allelopathy)
- Change color of the plants to green or red depending on compatibility
- Drawing garden beds
- Selecting elements on the garden (you can select multiple elements by Selection tool or by holding the ctrl key and clicking on the elements)
- Moving selected elements (to move multiple elements, hold the ctrl key)
- Deleting elements from the garden (press the delete key or middle mouse button)
- List of plants with their compatibility
- Selecting plants from the list
- Zoom in and out
- Move view around
- Selecting plants from extended list
- Dark and light theme

## Roadmap

- [ ] Save garden to file
- [ ] Load garden from file
- [ ] Store garden in local storage
- [ ] Add more plants
- [ ] Performance improvements (e.g. works slowly with many plants)
- [ ] Add more information about plants
- [ ] Migration to Nuxt.js

## Plants declaration format

All plants are declared in the `src/plants/index.ts` file. The format of the declaration is as follows:

```typescript
    plant_name: {
        friends: ['friend1', 'friend2', ...],
        enemies: ['enemy1', 'enemy2', ...],
    },
    ...
```

To add a new plant, add a new entry to the `plants` object in the `src/plants/index.ts` file and add the plant image to the `src/assets/plants` folder with the same name as the plant.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Pinia](https://pinia.esm.dev/)

## Development

To run the application locally, you need to have Node.js installed. Then you can run the following commands:

```bash
npm install
npm run dev
```

## Thanks

I would like to thank [Katarzyna Rzyska](https://www.linkedin.com/in/katarzyna-rzyska) for creating the plants graphics and all the people involved in the development of the technologies used in this project.
