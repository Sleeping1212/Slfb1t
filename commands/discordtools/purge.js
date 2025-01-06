const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'purge',
  aliases: ['clearmessages'],
  async execute(message, args) {
    await message.delete();
    const userToPurge = message.mentions.users.first();
    const numMessages = parseInt(args[2]) || 50;

    if (!userToPurge) {
      message.channel.send("❌ Please mention a user to purge messages.");
      return;
    }
    try {
      const messages = await message.channel.messages.fetch({ limit: 100 });
      const userMessages = messages.filter(msg => msg.author.id === userToPurge.id).slice(0, numMessages);
      await message.channel.bulkDelete(userMessages);
      message.channel.send(`🧹 Cleared ${userMessages.size} messages from ${userToPurge.tag}.`);
      log(`Purged ${userMessages.size} messages from ${userToPurge.tag}`);
    } catch (error) {
      message.channel.send("❌ Unable to purge messages. Check permissions.");
      log(`Failed to purge messages for ${userToPurge.tag}`);
    }
  }
};
