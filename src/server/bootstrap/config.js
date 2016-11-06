import { util } from '../modules';

/**
 * Config Bootstrap
 * @param {Function} done Executed when task is done
 */
export default function configBootstrap(done) {
  util.logger.info('(Bootstrap) Loading configuration');
  require('../../../config');
  done();
}
