const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'listen',
  aliases: ['startlisten', 'setlisten'],
  info: 'sets the user to listen to a song',
  usage: 'listen [song]',
  async execute(message, content) {
    await message.delete();
    const activityDescription = content.slice(8).trim();
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { type: "LISTENING" });
      message.channel.send(`🎶 You are now listening to **${activityDescription}**!`);
      log(`Listening set with song: ${activityDescription}`);
    } else {
      message.channel.send("❌ Please provide a song description.");
    }
  }
};
