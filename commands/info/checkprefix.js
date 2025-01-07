const { log } = require('../../utils/logger.js');
const config = require('../../config.json');

module.exports = {
  name: 'checkprefix',
  aliases: ['prefix'],
  info: 'displays the current prefix for the bot',
  usage: 'checkprefix',
  execute(message) {
    const currentPrefix = config.prefix;

    const prefixMessage = `
> ## 🔎 **Current Prefix** 🔎
> 
> The current prefix for this bot is: \`${currentPrefix}\`
> 
> **Example usage:** ${currentPrefix}help
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;

    message.channel.send(prefixMessage);
    
    log(`Checkprefix command executed. Current prefix: ${currentPrefix}`);

    message.delete();
  }
};