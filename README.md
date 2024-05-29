# Allelo - Application for allelopathic garden planning

Allelo is a web application that helps gardeners plan their garden by graphically drawing the garden and placing plants on it.
The application will show the user which plants are compatible with each other and which are not. This is a preliminary version of the application, and it is still under development.

https://github.com/SpaceShaman/allelo/assets/1573423/c79b7b9d-5a19-41aa-a419-8eca97361fdc

## Features

- Put plants on the garden
- Show compatibility between plants (allelopathy)
- Change color of the plants to green or red depending on compatibility
- Drawing garden beds
- Selecting elements on the garden
- Deleting elements from the garden
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

- [Vue.js](https://vuejs.org/)
- [Vuetify](https://vuetifyjs.com/)
- [Pinia](https://pinia.esm.dev/)
- [TypeScript](https://www.typescriptlang.org/)