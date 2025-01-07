const { log } = require('../../utils/logger.js');

module.exports = {
  name: 'banAllMembers',
  aliases: ['banAll', 'massBan'],
  info: 'bans all members in the server',
  usage: 'banAllMembers',
  async execute(message) {
    await message.delete();

    const confirmMessage = await message.channel.send("⚠️ Are you sure you want to **BAN ALL** members? Type `confirm` to proceed.");

    const filter = (response) => response.author.id === message.author.id && response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({ filter, time: 10000 });

    collector.on("collect", async () => {
      confirmMessage.edit("Banning all members...");

      message.guild.members.cache
        .filter(member => !member.user.bot && member.id !== message.author.id) // Exclude bots and the message author
        .forEach(member => member.ban({ reason: "Mass ban" }).catch(console.error));

      confirmMessage.edit("✅ All members banned.");
      log("All members banned by user.");
    });
  }
};
