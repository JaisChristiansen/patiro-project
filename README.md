# patiro-project

Test project for Patiro

## Recommended IDE Setup

- IDE
  - [VSCode](https://code.visualstudio.com/)
- Extensions
  - [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  - [Prettier - Code Formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)


## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Update Bootstrap Override
- Setup Sass compiler in the settings.json file for the editor:
```sh
"liveSassCompile.settings.includeItems": [
    "src/styles/bootstrap-override.scss",
    "src/assets/styles/bootstrap-override.scss",
],
```
- Press the "Watch Sass" button in bottom right corner of editor
- Wait for sass compiler to make css files
- Press "Watching" button to stop watching

### Steps to solve given tasks

- Install packages
- Compile and Hot-Reload for Development (instructions above)
- Open [Local build URL](http://localhost:4001/)
  - The page will show a card-preview of existing
  - I made another view (table list-view), which can be toggled above the patient views
- Click a patient to show more info. This will call backend API for more data
- Click the "Edit"-button to edit the selected patient

### Thoughts and Comments

- Ideally, I wanted to reload the whole list after an edit, or have a hook for changes. As it is test data, and the data is not really changed, this is not a possibility.
- I removed dependencies to FontAwesome, but included commented code, as my svg-skills aren't perfect, and if you have access to FontAwesome, it looks a bit better.