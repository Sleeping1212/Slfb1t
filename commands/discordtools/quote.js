const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'quote',
  aliases: ['addquote'],
  info: 'quotes your message',
  usage: 'qoute [message]',
  async execute(message, args) {
    await message.delete();
    const quote = args.join(" ");
    
    if (!quote) return message.channel.send("❌ Please provide a quote.");
    
    message.channel.send(`💬 **Quote:** "${quote}"`);
    log(`Quote added: "${quote}"`);
  }
};
