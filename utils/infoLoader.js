function infoLoad(command, message) {
    let infoMsg = `ℹ️ **Info about \`${command.name}\`**: \`${command.info}\``;
    message.delete();
    message.channel.send(infoMsg)
}

module.exports = { infoLoad }