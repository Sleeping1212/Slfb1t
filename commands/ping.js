module.exports = {
  name: 'ping',
  aliases: ['p'],
  async execute(message) {
    message.reply('Pong!');
  }
}