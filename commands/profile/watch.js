const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'watch',
  aliases: ['startwatch', 'setwatch'],
  async execute(message, content) {
    await message.delete();
    const activityDescription = content.slice(7).trim();
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { type: "WATCHING" });
      message.channel.send(`📺 You are now watching **${activityDescription}**!`);
      log(`Watching set with title: ${activityDescription}`);
    } else {
      message.channel.send("❌ Please provide a title to watch.");
    }
  }
};
