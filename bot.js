const { Client, RichPresence, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { checkUpdate } = require('./utils/updateChecker.js');
const Json = require("./package.json");
const path = require('path');
const colors = require('ansi-colors');
const { initLogger, status, warn } = require('./utils/logger');
const { logdeviceInfo } = require('./utils/infoLog.js');
const { usageLoad } = require('./utils/usageLoad.js');
const { infoLoad } = require('./utils/infoLoader.js');

const devConfigPath = './devconfig/config.json';
const regularConfigPath = './config.json';
let config;

if (fs.existsSync(path.dirname(devConfigPath))) {
    config = JSON.parse(fs.readFileSync(devConfigPath, 'utf-8'));
    status(`Using dev config.`);
} else {
    config = JSON.parse(fs.readFileSync(regularConfigPath, 'utf-8'));
}


const client = new Client({ checkupdates: false });
const token = config.token;
let prefix = config.prefix;

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
  status(`Logged in as ${client.user.tag}`);
  const serverIconUrl = "https://cdn.discordapp.com/icons/1315224713932443668/a_1234567890123456789012345678901234567890.png";
  rpc(serverIconUrl);
});


client.on('messageCreate', (message) => {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);
  if (!command) return;
  if (args[0] === '--usage')  {
    usageLoad(command, message);
    return;
  }
  if (args[0] === '--info')  {
    infoLoad(command, message);
    return;
  }
  command.execute(message, args, prefix);
});

let client_info = {
  raidsEnabled: false,
  moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨"
}
client.info = client_info;

let rpc = (serverIconUrl) => {
  let stat = {
    name: "Hydrion S3LFB0T",
    type: "PLAYING",
    details: "Using the best selfbot",
    timestamps: { start: Date.now() },
    assets: {
      large_image: serverIconUrl, 
      large_text: "Hydrion S3LFB0T",
    },
    buttons: [
      { label: "SelfBot", url: "https://github.com/Hydrion-Tools/Hydrion-S3LFB0T" },
      { label: "Discord", url: "https://discord.gg/6Tufbvnebj" }
    ],
  };
  client.user.setPresence({ activities: [stat] });
  status('Started Discord RPC')
}

let updated = checkUpdate(Json);
if (updated) {
  client.login(token);
} else {
  warn('Please backup your config.json and install the latest version to continue using Hydrion!! Thank you');
}

const VERSION = Json.version;

function displayTextArt() {
  const textArt = `
${colors.cyanBright('██╗░░██╗██╗░░░██╗██████╗░██████╗░██╗░█████╗░███╗░░██╗')}
${colors.cyanBright('██║░░██║╚██╗░██╔╝██╔══██╗██╔══██╗██║██╔══██╗████╗░██║')}
${colors.cyanBright('███████║░╚████╔╝░██║░░██║██████╔╝██║██║░░██║██╔██╗██║')}
${colors.cyanBright('██╔══██║░░╚██╔╝░░██║░░██║██╔══██╗██║██║░░██║██║╚████║')}
${colors.cyanBright('██║░░██║░░░██║░░░██████╔╝██║░░██║██║╚█████╔╝██║░╚███║')}
${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝ v${VERSION}`)}
`;
  console.clear();
  console.log(textArt);
}

function startlogs() {
  console.clear();
  displayTextArt();
  console.log(colors.green(`\nVersion: ${VERSION}`));
  console.log(colors.gray('Initializing logs...\n'));

  initLogger();
}

startlogs();
logdeviceInfo();
