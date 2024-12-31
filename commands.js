const quotes = [
  'The best way to predict the future is to invent it.',
  'Life is what happens when you’re busy making other plans.',
  'Do or do not. There is no try.',
];

module.exports = {
  ping: (message) => {
      message.reply('Pong!');
  },
  quote: (message) => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      message.reply(randomQuote);
  },
};
