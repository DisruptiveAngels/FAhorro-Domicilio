import series from 'async/series';
import colors from 'colors';
import { util } from '../modules';

/**
 * Application Bootstrap
 *
 * @description This script will initialize every required module in the
 * application such as database connections, third party integrations, and event
 * listeners.
 *
 * Each bootstrap file should export a function that takes a callback.
 * The callback should be executed when it has completed it's tasks or when
 * something fails. In case of errors, the callback should be passed the error
 * as a parameter.
 */

// Get start timestamp to measure initialization duration
let start = new Date();

// Run all bootstrap functions in series in an orderly manner
series([

  require('./config'),
  require('./database'),
  require('./server')

], onComplete);


/**
 * Completion Callback
 */
function onComplete(err) {
  if (err) {
    util.logger.error('(Bootstrap) Application failed to initialize!');
    return process.exit(err);
  }

  // Success!
  let end = new Date();
  let duration = (end-start);
  util.logger.info(colors.blue(`(Bootstrap) Application initialized (Took ${duration}ms) ✔︎`));
}
