const { log } = require('../../utils/logger.js');
const raidState = require('../../managers/raidState.js');

module.exports = {
  name: 'raidstop',
  aliases: ['endRaid', 'stopRaid'],
  async execute(message) {

    if (!raidState.raidActive) {
      return message.reply("No active raid to stop.");
    }

    raidState.clearRaidInterval();
    raidState.setRaidActive(false);
    message.channel.send("✅ **Raid stopped!** No more messages will be sent.");
    log("Raid stopped.");
    await message.delete();
  }
};
