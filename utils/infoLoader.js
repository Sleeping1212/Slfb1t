const { log } = require('./logger');

const infoLoad = (command, message) => {
  log(`Info Command has been excuted for ${command}`);
  if (command === 'raids' || command === 'r' || command === 'raid') {
    message.channel.send('🚨This command is used to view the raid commands.');
  }
  else if (command === 'ping' || command === 'p') {
    message.channel.send('🏓This command is used to check ping');
  }
}

module.exports = { infoLoad };