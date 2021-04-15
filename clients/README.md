# Ascension Clients

Static HTML/JS applications for stand-alone sections of the Ascension website:

### Screens

- Title Screen
- Login Screen
- Player Selection
- Player Editor
- World Selection
- World Forge
- Game Viewer
- Map Overlays

### Shared Models

- Local Storage
- Persistence API

### Components

The plan is to use [Component Driven Development](https://www.componentdriven.org/) to build one component at a time, which are then combined together, until they can be assembled into pages. The screens listed above are the end goal for the pages to be presented to users. The components are the building blocks for those pages.

## Development

For set up locally, clone the parent repo, and change into the `clients` folder, then run:
```
npm install
```

### Start

To view the web clients, start vuepress running locally using:
```
npm start
```

### Storybook

To develop components, start storybook running locally using:
```
npm run storybook
```

### Linting

To lint files in the project, run:
```
npm run lint
```

### Testing

To lint and test files, run:
```
npm run lint -s && npm test -s
```

Javascript files and helper methods should be tested by adding unit tests to `tests/unit`.