const { log } = require('../utils/logger');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  async execute(message) {
    message.delete();
    message.reply(`🏓 Your Ping is ${message.createdTimestamp - Date.now()}ms!`);
    log(`Ping Command has been excuted and ping is ${message.createdTimestamp - Date.now()}ms!`)
  }
}