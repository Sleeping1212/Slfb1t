const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'stopactivity',
  aliases: ['stopactivity', 'clearactivity'],
  async execute(message) {
    await message.delete();
    await client.user.setActivity(null);
    log("Activity cleared.");
  }
};
