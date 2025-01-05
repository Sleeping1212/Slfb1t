const { status } = require('../../utils/logger');

module.exports = {
  name: 'play',
  aliases: ['p'],
  execute(message, args, client) {
    const pres = args.join(' ');
    if(pres) {
      client.user.setActivity(pres, { type: 'PLAYING' });
      status(`Playing ${pres}`);
      message.channel.send(`🎮 You are now playing **${pres}**!`);
    } else {
      message.channel.send("❌ Please provide a game description.");
    }
  }
}