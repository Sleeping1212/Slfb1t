const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'play',
  aliases: ['game', 'playGame', 'setGame'],
  info: 'sets the user to play a game',
  usage: 'play [game]', 
  async execute(message, args, client) {
    await message.delete();
    const activityDescription = args.slice(1).join(" ").trim(); 
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { type: "PLAYING" });
      message.channel.send(`🎮 You are now playing **${activityDescription}**!`);
      log(`User set their activity to playing: ${activityDescription}`);
    } else {
      message.channel.send("❌ Please provide a game description.");
      log("User attempted to set activity without providing a description.");
    }
  }
};
