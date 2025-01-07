const { log } = require('../../utils/logger.js');
const afkState = require('../../managers/afkState.js');

module.exports = {
  name: 'unafk',
  aliases: ['back', 'comeBack'],
  info: 'returns you from being AFK',
  usage: 'unafk',
  async execute(message) {
    await message.delete();

    if (!afkState.afkStatus) {
      return message.reply("You are not currently AFK.");
    }

    const afkEndTime = new Date();
    const afkDuration = afkEndTime - afkState.afkStartTime;

    const seconds = Math.floor((afkDuration / 1000) % 60);
    const minutes = Math.floor((afkDuration / (1000 * 60)) % 60);
    const hours = Math.floor((afkDuration / (1000 * 60 * 60)) % 24);
    const days = Math.floor(afkDuration / (1000 * 60 * 60 * 24));

    let afkDurationString = '';
    if (days > 0) afkDurationString += `${days} day${days > 1 ? 's' : ''} `;
    if (hours > 0) afkDurationString += `${hours} hour${hours > 1 ? 's' : ''} `;
    if (minutes > 0) afkDurationString += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    if (seconds > 0) afkDurationString += `${seconds} second${seconds > 1 ? 's' : ''} `;

    afkState.setAfkStatus(false); 
    afkState.setAfkReason('');
    afkState.setAfkStartTime(null); 

    message.channel.send(`🎉 You are no longer AFK! You were AFK for ${afkDurationString.trim()}.`);
    log(`AFK ended. Duration: ${afkDurationString.trim()}`);
  }
};
