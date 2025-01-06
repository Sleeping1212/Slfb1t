const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'idle',
  aliases: ['idlemode', 'afk'],
  async execute(message, args) {
    await message.delete();
    const description = args.join(' ') || "Idle";
    await client.user.setPresence({ activities: [{ name: description }], status: "idle" });
    message.channel.send(`🌙 You are now idle: **${description}**`);
    log("Set Idle mode with description: " + description);
  }
};
