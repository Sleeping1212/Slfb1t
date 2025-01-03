const { log } = require('../utils/logger');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  async execute(message) {
    await message.delete().catch(err => console.error("Failed to delete message:", err));
    message.channel.send(`🏓 Your Ping is ${message.createdTimestamp - Date.now()}ms!`);
    log(`Ping Command has been excuted and ping is ${message.createdTimestamp - Date.now()}ms`);
  }
};