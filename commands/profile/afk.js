const { log } = require('../../utils/logger.js');
const afkState = require('../../managers/afkState.js');

module.exports = {
  name: 'afk',
  aliases: ['setafk', 'goafk'],
  async execute(message, args) {
    await message.delete();
    const reason = args.join(' ') || 'No reason provided';
    
    if (afkState.afkStatus) {
      return message.reply("You are already AFK.");
    }

    afkState.setAfkStatus(true);
    afkState.setAfkReason(reason);
    afkState.setAfkStartTime(new Date());

    message.channel.send(`😴 You are now AFK. Reason: ${reason}`);
    log(`AFK started with reason: ${reason}`);
  }
};
