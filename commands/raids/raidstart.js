const { log } = require('../../utils/logger.js');
const raidState = require('../../managers/raidState.js');

module.exports = {
  name: 'raidstart',
  aliases: ['startRaid', 'initiateRaid'],
  info: 'starts a raid',
  usage: 'raidstart [message]',
  async execute(message, args, prefix) {
    const messageToSend = args.join(' ') || "🚨 Raid initiated! 🚨";
    const interval = 400;
    const channel = message.channel;
    await message.delete();

    if (raidState.raidActive) {
      return message.reply(`Raid is already active! Use ${prefix}raidstop to stop it.`);
    }

    raidState.setRaidActive(true);
    channel.send("🔴 **Raid started!** Messages will be sent every 400 milliseconds.");
    log("Raid started with message: " + messageToSend);

    const raidInterval = setInterval(() => {
      if (raidState.raidActive) {
        channel.send(messageToSend);
      }
    }, interval);

    raidState.setRaidInterval(raidInterval);
  }
};
