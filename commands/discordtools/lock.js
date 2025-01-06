const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'lock',
  aliases: ['channellock'],
  async execute(message) {
    await message.delete();
    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false });
      message.channel.send("🔒 Channel is now locked.");
      log(`Channel locked: ${message.channel.name}`);
    } catch (error) {
      message.channel.send("❌ Unable to lock the channel.");
      log(`Failed to lock channel: ${message.channel.name}`);
    }
  }
};
