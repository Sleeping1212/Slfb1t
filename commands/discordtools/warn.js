const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'warn',
  aliases: ['issuewarning'],
  async execute(message, args) {
    await message.delete();
    const user = message.mentions.users.first();
    const reason = args.slice(1).join(" ") || "No reason provided";
    
    if (!user) return message.channel.send("❌ Please mention a user to warn.");
    
    message.channel.send(`⚠️ **Warning issued to ${user.username}**\nReason: ${reason}`);
    log(`Warning issued to ${user.username}: ${reason}`);
  }
};
