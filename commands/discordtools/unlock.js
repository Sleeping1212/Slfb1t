const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'unlock',
  aliases: ['channelunlock'],
  async execute(message) {
    await message.delete();
    try {
      await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true });
      message.channel.send("🔓 Channel is now unlocked.");
      log(`Channel unlocked: ${message.channel.name}`);
    } catch (error) {
      message.channel.send("❌ Unable to unlock the channel.");
      log(`Failed to unlock channel: ${message.channel.name}`);
    }
  }
};
