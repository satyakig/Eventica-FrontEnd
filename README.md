# SENG 513 - Winter 2020 - Final Project

## Group 12, Eventica

### Front End application

- GitHub: [https://github.com/satyakig/SENG-513-FrontEnd](https://github.com/satyakig/SENG-513-FrontEnd)
- Deployed Project: [https://seng-513.web.app/](https://seng-513.web.app/)
- BROWSERS: Chrome, Firefox

### Setup

- Install NodeJS v12 from [https://nodejs.org/en/download/releases/](https://nodejs.org/en/download/releases/)
- Clone the GitHub repo
- Use a terminal and navigate to the project root directory
- Run `npm install` or `npm ci` to install the project dependencies
- Run `npm start` to start the application locally
- Application will start on `https://localhost:3000`
- Note:

  The frontend application is configured to interact with the cloud Node.js server.
  So it is not required to run the server locally to test the client application on localhost.
  However, it can be configured to use a local server instead, by changing `line #20` in `src/lib/HttpRequest.ts` to `http://localhost:3001/` instead.

### IDE Integration

1. WebStorm: https://prettier.io/docs/en/webstorm.html
2. VSCode: Install the `eslint` and `prettier` plugins. Add these configurations to your settings
   ```
   "editor.formatOnSave": true,
   "eslint.format.enable": true,
   "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
   },
   ```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Code Style

This project uses [eslint](https://eslint.org) and [prettier](https://prettier.io) for linting and formatting JavaScript code. <br>
For CSS/SCSS style, we use [stylelint](https://github.com/stylelint/stylelint) and [scss](https://sass-lang.com/documentation/syntax). <br>

By default, all the linters run in pre-commit hooks to ensure that code is following the expected style guidelines <br>
before it is committed.

The following scripts are included: <br>

- `npm run lint`: Runs the linting tools and outputs and violations to the console
- `npm run lint:fix`: Same as above, but will attempt to fix any violations. Note <br>
  that eslint cannot fix some errors. Any errors that are not fixed will be displayed <br>
  in the console.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
