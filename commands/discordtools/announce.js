const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'announce',
  aliases: ['announcement'],
  info: 'announces a message in announcement Channel',
  usage: 'announce [message]',
  async execute(message, args) {
    await message.delete();
    const announcement = args.join(" ").trim();
    if (!announcement) {
      message.channel.send("❌ Please provide an announcement message.");
      return;
    }

    try {
      const announceChannel = message.guild.channels.cache.find(ch => ch.name.toLowerCase() === "annc");
      if (!announceChannel) {
        message.channel.send("❌ Announcement channel not found.");
        return;
      }
      announceChannel.send(`📢 **Announcement:** ${announcement}`);
      log(`Announcement sent: ${announcement}`);
    } catch (error) {
      message.channel.send("❌ Unable to send the announcement.");
      log(`Failed to send announcement: ${error.message}`);
    }
  }
};
