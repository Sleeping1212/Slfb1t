const { log, warn } = require('../../utils/logger.js');
const axios = require('axios');

module.exports = {
  name: 'meme',
  aliases: ['m'],
  info: 'fetches a random meme from the meme-api',
  usage:'meme',
  execute(message) {
    axios.get("https://meme-api.com/gimme")
      .then(response => {
        const data = response.data;
        message.channel.send({
          content: `🤣 **Meme:** ${data.title}`,
          files: [data.url]
        });
        log(`Meme command has been executed`);
      })
      .catch(error => {
        warn("Failed to fetch meme:", error);
        message.channel.send("❌ Could not fetch a meme right now.");
      });

    message.delete();
  }
};