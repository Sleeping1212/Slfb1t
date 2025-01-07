const { log } = require('../../utils/logger.js');
const ms = require('ms');

module.exports = {
  name: 'mute',
  aliases: ['mutemember', 'silent'],
  info: 'mutes a specified user',
  usage:'mute [@user] [duration]',
  async execute(message, args) {
    await message.delete();
    const userToMute = message.mentions.users.first();
    const duration = args[1];

    if (!userToMute || !duration) {
      return message.reply("Please mention a user to mute and specify the duration (e.g., 10m, 1h, 1d).");
    }

    const member = message.guild.members.cache.get(userToMute.id);
    if (member) {
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (muteRole) {
        await member.roles.add(muteRole);
        message.reply(`${userToMute.username} has been muted for ${duration}.`);
        log(`${userToMute.username} muted for ${duration}.`);

        setTimeout(async () => {
          await member.roles.remove(muteRole);
          message.channel.send(`${userToMute.username} has been unmuted.`);
          log(`${userToMute.username} unmuted after ${duration}.`);
        }, ms(duration));
      } else {
        message.reply("Muted role does not exist. Please create a 'Muted' role.");
        log("Muted role does not exist.");
      }
    } else {
      message.reply("User not found in this server.");
      log("User not found for mute.");
    }
  }
};
