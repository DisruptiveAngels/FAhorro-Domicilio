import { util } from '../modules';

/**
 * Database Bootstrap
 * @param  {Function} done Executed when task is done
 */
export default function bootstrapDatabase(done) {
  util.logger.info('(Bootstrap) Initializing database modules');
  util.mysql.init(done);
}
