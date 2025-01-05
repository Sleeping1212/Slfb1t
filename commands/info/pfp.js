const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'pfp',
  aliases: ['pf'], 
  execute(message, args) {
    const user = message.mentions.users.first() || args[0] || message.author;
    const avatar = user.displayAvatarURL({ dynamic:true, size:1024 });

    message.channel.send(`
      ${user.username}'s Profile Picture
      \n
      ${avatar}
    `);
    log(`Pfp command has been executed on ${user.username}`)
    message.delete();
  }
}