const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'slowmode',
  aliases: ['setslowmode'],
  info: 'sets slowmode for the current channel',
  usage: 'slowmode [time in seconds]',
  async execute(message, args) {
    await message.delete();
    const time = parseInt(args[0], 10);
    if (isNaN(time) || time < 0) return message.channel.send("❌ Please provide a valid number for slowmode (in seconds).");
    
    await message.channel.setRateLimitPerUser(time);
    message.channel.send(`🐢 Slowmode is set to ${time} seconds.`);
    log(`Slowmode set to ${time} seconds in ${message.channel.name}`);
  }
};
