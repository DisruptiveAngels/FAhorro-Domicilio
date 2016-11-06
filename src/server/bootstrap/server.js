import http from 'http';
import path from 'path';
import express from 'express';
import { util } from '../modules';
import middleware from '../middleware';
import controllers from '../controllers';

/**
 * Server bootstrap
 * @param  {Function} done Executed when task is completed
 */
export default function bootstrapServer(done) {
  util.logger.info('(Bootstrap) Initializing server');

  // Create express application
  const app = express();

  // Public directories
  app.use('/resources', express.static(path.join(__dirname, '../../../resources')));
  app.use('/dist', express.static(path.join(__dirname, '../../../dist')));

  // Bind middleware
  app.use(middleware.httpLogger);
  app.use(middleware.body);

  // Bind all controllers to the express application
  for (let c in controllers) {
    app.use(controllers[c]);
  }

  // Create http server and bind express application to it
  const server = http.createServer(app);
  const port = global.config.PORT || 3000;

  server.listen(port, () => {
    util.logger.info(`▸ HTTP server running on http://0.0.0.0:${port}`);
    done();
  });
}
