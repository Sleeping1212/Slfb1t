const { log } = require('./logger.js');

function infoLoad(command, message) {
    let infoMsg = `ℹ️ **Info about \`${command.name}\`**: \`${command.info}\``;
    message.delete();
    message.channel.send(infoMsg)
    log(`Info Command has been executed for Command ${command.name}`)
}

module.exports = { infoLoad }