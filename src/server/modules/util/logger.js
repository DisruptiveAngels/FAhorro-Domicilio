import winston from 'winston';
import moment from 'moment';

const logger = new winston.Logger({

  transports: [
    new winston.transports.Console({
      timestamp: function() { return moment().format('HH:mm:ss'); },
      colorize: true
    })
  ]

});

export default logger;
