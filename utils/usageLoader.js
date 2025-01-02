const { log } = require('./logger');

const usageLoad = (command, message) => {
  log(`Usage Command has been excuted for ${command}`);
  if (command === 'raids' || command === 'r' || command === 'raid') {
    message.channel.send(`Usage: ${prefix}raids <page number>`);
  }
  else if (command === 'ping' || command === 'p') {
    message.channel.send(`Usage: ${prefix}ping`);
  }
}

module.exports = { usageLoad };