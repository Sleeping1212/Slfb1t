module.exports = {
  name: 'poll',
  aliases: ['survey'],
  async execute(message, args) {
    await message.delete();

    const question = args.join(" ");
    if (!question) return message.channel.send("❌ Please provide a question for the poll.");

    try {
      const pollMessage = await message.channel.send(`📊 **Poll:** ${question}\nReact with 👍 for yes or 👎 for no!`);
      await pollMessage.react("👍");
      await pollMessage.react("👎");
    } catch (error) {
      console.error("Error creating poll:", error);
      message.channel.send("❌ There was an error creating the poll.");
    }
  },
};
