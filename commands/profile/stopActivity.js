const { log } = require('../../utils/logger.js');
const { rpc } = require('../../bot.js');

module.exports = {
  name: 'stopactivity',
  aliases: ['stopactivity', 'clearactivity'],
  info: 'clears the user\'s current activity',
  usage: 'stopactivity',
  async execute(message) {
    await message.delete();
    await client.user.setActivity(null);
    log("Activity cleared.");
    await rpc(client);
  }
};
