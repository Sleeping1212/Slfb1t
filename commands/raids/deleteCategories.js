const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'deleteCategories',
  aliases: ['deleteAllCategories', 'removeCategories'], 
  async execute(message) {
    await message.delete();

    const confirmMessage = await message.channel.send("⚠️ Are you sure you want to delete **ALL CATEGORIES**? Type `confirm` to proceed.");

    const filter = (response) => response.author.id === message.author.id && response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({ filter, time: 10000 });

    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all categories...");

      message.guild.channels.cache
        .filter(channel => channel.type === "GUILD_CATEGORY")
        .forEach(category => category.delete().catch(console.error));

      confirmMessage.edit("✅ All categories deleted.");
      log("All categories deleted by user.");
    });
  }
};
