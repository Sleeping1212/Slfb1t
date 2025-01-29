const { log } = require('../../utils/logger');

module.exports = {
  name: 'userinfo',
  aliases: ['ui'],
  info: 'shows user information',
  usage: 'userinfo [@user]',
  execute(message, args) {
    const user = message.mentions.users.first() || message.author || args[0];
    getuserinfo(message, user);
    message.delete()
  }
};

function getuserinfo(message, mentionedUser) {
    const userID = mentionedUser.id;
    const username = mentionedUser.username;
    const discriminator = mentionedUser.discriminator;
    const createdAt = mentionedUser.createdAt.toDateString(); 
    const status = mentionedUser.presence ? mentionedUser.presence.status : 'offline';
    

    const userInfoMessage = `
> ## 👤 **User Information** 👤
> 
> **Username:** ${username}#${discriminator}
> **User ID:** ${userID}
> **Account Created On:** ${createdAt}
> **Current Status:** ${status}
> 
> ✨ Selfbot crafted by \`@slaves\`
`;


  log(`Userinfo Command has been excuted on user ${username}#${discriminator}`);
  message.channel.send(userInfoMessage);
}
