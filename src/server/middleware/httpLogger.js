import { util } from '../modules';
import onFinished from 'on-finished';

/**
 * Request logger Middleware
 * @description Logs every http request that passes through it
 */
export default function httpLogger(req, res, next) {
  req.start = Date.now();
  onFinished(res, () => {
    req.end = Date.now();
    req.duration = req.end - req.start;
    let code = res.statusCode;
    let info = `${req.method} ${code} ${req.originalUrl} - ${req.duration}ms`;
    if (code < 400) {
      util.logger.info(`(http) ${info}`);
    } else {
      util.logger.warn(`(http) ${info}`);
    }
  });
  next();
}
