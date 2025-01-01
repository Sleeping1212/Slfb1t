const { log } = require('../utils/logger');

module.exports = {
  name: 'ping',
  aliases: ['p'],
  async execute(message) {
    message.reply(`🏓 Your Ping is ${Date.now() - message.createdTimestamp}ms!`);
    log(`Ping Command has been excuted and ping is ${Date.now() - message.createdTimestamp}ms!`)
  }
}