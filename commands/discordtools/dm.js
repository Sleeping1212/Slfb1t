module.exports = {
  name: 'dm',
  aliases: ['directmessage'],
  info: 'dms a message to a user',
  usage: 'dm @user <message>',
  async execute(message, args) {
    await message.delete();

    const user = message.mentions.users.first();
    const dmMessage = args.slice(1).join(" "); 
    if (!user || !dmMessage) return message.channel.send("❌ Usage: `-dm @user <message>`");

    try {
      await user.send(dmMessage);
      message.channel.send(`📬 DM sent to ${user.username}.`);
    } catch (error) {
      console.error("Failed to send DM:", error);
      message.channel.send("❌ Failed to send DM.");
    }
  },
};
