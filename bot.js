const { Client, Presence, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { checkUpdate } = require('./updateChecker.js');
const Json = require("./package.json");
const path = require('path');


let config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
// let config = JSON.parse(fs.readFileSync('./devconfig/config.json', 'utf-8'));


const updated = checkUpdate(Json);
const client = new Client({ checkupdates: false });
const token = config.token;
const prefix = config.prefix;

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if (command.name) {
      client.commands.set(command.name, command);
      if (command.aliases) {
          command.aliases.forEach(alias => {
              client.commands.set(alias, command);
          });
      }
  }
}

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
});


client.on('messageCreate', (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;
  command.execute(message, args);
});


if (updated) {
  client.login(token); 
}
else {
  console.log("Selfbot will not start due to outdated version");
}