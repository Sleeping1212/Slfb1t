const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'kick',
  aliases: ['kickuser', 'kicky'],
  info: 'kicks a specified user',
  usage: 'kick [@user]',
  async execute(message, args) {
    await message.delete();
    const userToKick = message.mentions.users.first() || args[0];
    if (!userToKick) {
      return message.reply("❌ Please mention a user to kick.");
    }

    const member = message.guild.members.cache.get(userToKick.id);
    if (member) {
      try {
        await member.kick();
        message.channel.send(`✅ ${userToKick.username} has been kicked.`);
        log("Kicked user: " + userToKick.username);
      } catch (error) {
        message.channel.send("❌ Failed to kick the user. Please check permissions.");
        log("Error kicking user: " + userToKick.username + " - " + error.message);
      }
    } else {
      message.reply("❌ User not found in this server.");
    }
  }
};
