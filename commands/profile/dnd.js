const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'dnd',
  aliases: ['donotdisturb', 'dndmode'],
  async execute(message, args) {
    await message.delete();
    const reason = args.join(' ') || "Do Not Disturb";
    await client.user.setPresence({ activities: [{ name: reason }], status: "dnd" });
    message.channel.send(`🔴 You are now in Do Not Disturb mode: **${reason}**`);
    log("Set DND with reason: " + reason);
  }
};
