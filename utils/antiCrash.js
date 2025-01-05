const { log } = require('./logger.js');

module.exports = () => {
  process.on('uncaughtException', (error) => {
    log('Uncaught Exception:', error.stack || error);
  });

  process.on('unhandledRejection', (reason, promise) => {
    log('Unhandled Rejection at:', promise, 'Reason:', reason);
  });

  process.on('warning', (warning) => {
    log('Warning:', warning.stack || warning);
  });

  log('Anti-crash module initialized. All errors will be logged.');
};
