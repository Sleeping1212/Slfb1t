const { log } = require('./logger.js');

function usageLoad(command, message, prefix) {
  let usageMsg = `ℹ️ **Usage of \`${command.name}\`**: \`${prefix}${command.usage}\``
  message.delete();
  message.channel.send(usageMsg)
}

module.exports = { usageLoad }