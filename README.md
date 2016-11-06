# React - Full Stack
[React](https://facebook.github.io/react/) boilerplate featuring [React-Router](https://github.com/reactjs/react-router), [Baobab](https://github.com/Yomguithereal/baobab), [Less](http://lesscss.org/), [Webpack](https://webpack.github.io/docs/) & [Hot Reloading](https://github.com/gaearon/react-hot-loader). Built for next generation [ES6](https://github.com/lukehoban/es6features)/[7](https://github.com/hemanth/es7-features) web applications.

[![DevinDM](https://david-dm.org/AlexKvazosMx/React-FullStack.svg)](https://david-dm.org/AlexKvazosMx/React-FullStack)
[![CircleCI](https://circleci.com/gh/AlexKvazosMx/React-Starter/tree/master.svg?style=svg)](https://circleci.com/gh/AlexKvazosMx/React-Starter/tree/master)


## Development
This project uses purely Webpack to bundle your javascript and css files. Resources like images, fonts, audio, or anything else is served by node from the `resources/` folder. The javascript and css bundles will be created on the `dist/` folder. This two folders are exposed by express using the built-in static middleware. During development, the `dist/` folder will not be created, Webpack will serve this imaginary folder from memory and the server will prefix the css and js includes so that they are loaded from the Webpack server instead.

```bash
$ npm run dev
```

This task will start the application in `development` mode. This command will do two things behind the scenes. First, it will run the application with nodemon and watch the server files. This way, the server will restart automatically when any server-side code changes.

Secondly, Webpack & [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) will prepare your javascript and css bundles and serve them from memory. Changes to the less stylesheets will trigger an automatic compile and a livereload on the browser. Changes to React components will also trigger hot reloads which will refresh the component logic on the browser without doing a full reload. All this functionality works with the already installed modules, no browser extensions are required. Source maps are generated for the javascript bundle.

## Configuration
Take a look at the `config/` folder which provides a default configuration file. You must copy this and rename it to its proper environment, for example `env.development.js` for development and `env.production.js` for production. This two files export an object that will be available on the server using `global.config`. If you do not create the required config for the environment you will be running on, the application will not start.

## Building
Building the application is easier than you expect. A single command will bundle both javascript and css and output them on the `dist/` folder. So now when you start the application in production mode, Node will serve this files directly.

```bash
$ npm run build
```

Both files will be compressed and applicable javascript variables will be mangled. No source maps will be generated.

If you want to exclude some code from development/production javascript bundles, you can easily do so like this:

```javascript
if (process.env.NODE_ENV === 'development') {
  // Anything inside this if statement, INCLUDING the statement, will be removed
  // completely from bundles that are not created by the development task.
  // You can go as far as requiring a file in here, knowing that it wont
  // be required in production builds.
}
```

## Production
Now that you've built the application with the build task, you can start your application in production mode.

```bash
$ npm start
```
