const axios = require('axios');
const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'translate',
  aliases: ['trans'],
  async execute(message, args) {
    await message.delete();
    const targetLang = args[0];
    const textToTranslate = args.slice(1).join(" ");

    if (!targetLang || !textToTranslate) {
      return message.channel.send("❌ Usage: `-translate <lang> <text>`");
    }

    try {
      const response = await axios.post('https://libretranslate.de/translate', null, {
        params: {
          q: textToTranslate,
          source: 'en',
          target: targetLang,
          format: 'text',
        },
      });

      const translatedText = response.data.translatedText;
      message.channel.send(`🌍 **Translated Text:** ${translatedText}`);
      log(`Translation from English to ${targetLang}: ${translatedText}`);
    } catch (error) {
      console.error("Translation error:", error);
      message.channel.send("❌ Translation failed.");
    }
  },
};
