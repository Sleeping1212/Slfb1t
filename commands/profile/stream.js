const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'stream',
  aliases: ['startstream', 'setstream'],
  info: 'sets the user\'s streaming status',
  usage: 'stream [streaming description]',
  async execute(message, content) {
    await message.delete();
    const activityDescription = content.slice(8).trim();
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { 
        type: "STREAMING", 
        url: "https://www.twitch.tv/your_channel" 
      });
      message.channel.send(`🎥 You are now streaming **${activityDescription}**!`);
      log(`Streaming set with title: ${activityDescription}`);
    } else {
      message.channel.send("❌ Please provide a streaming description.");
    }
  }
};
