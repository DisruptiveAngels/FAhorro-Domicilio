/**
 *	Config Autoloader
 *
 * @description WARNING PLEASE READ:
 * This code is in charge of binding the environment config to the
 * 'config' global. There is no need to change this code unless
 * you wish to change how the config is loaded into the application.
 */

import { util } from '../src/server/modules';

let { NODE_ENV } = process.env;

// Prevent the application from running without an environment variable.
if (!NODE_ENV || !NODE_ENV.length) {
  let error = `ERROR: No environment variable has been supplied.\n`
            + `Ensure that you are running the application with the\n`
            + `proper npm task.\n\n`
            + `npm start - Run the application in production mode.\n`
            + `npm run dev - Run the application in development mode.\n`;

  util.logger.error(error);
  process.exit();
}

try {

  // Load the configuration file and bind to global variable.
  const config = require(`./env.${NODE_ENV}`);
  global.config = config;

  util.logger.info(`▸ Loaded configuration file [env.${NODE_ENV}.js]`);

} catch (e) {
  // The configuration file couldn't be required, we assume it does not exist.
  let error = `ERROR: No configuration file found for "${NODE_ENV}".\n`
           + `Check "env.${NODE_ENV}.js" exists in the server config folder.\n`;

  util.logger.error(error);
  process.exit();
}
