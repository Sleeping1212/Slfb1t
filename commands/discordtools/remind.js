module.exports = {
  name: 'remind',
  aliases: ['reminder'],
  async execute(message, args) {
    await message.delete();

    const time = parseInt(args[0], 10);
    const reminderText = args.slice(1).join(" ");
    if (isNaN(time) || !reminderText) {
      return message.channel.send("❌ Usage: `-remind <time in minutes> <message>`");
    }

    message.channel.send(`⏰ Reminder set! I'll remind you in ${time} minutes.`);
    setTimeout(() => {
      message.channel.send(`🔔 Reminder: ${reminderText}`);
    }, time * 60 * 1000);
  },
};
