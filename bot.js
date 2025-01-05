const { Client, RichPresence, Collection } = require('discord.js-selfbot-v13');
const fs = require('fs');
const { checkUpdate } = require('./utils/updateChecker.js');
const Json = require("./package.json");
const path = require('path');
const colors = require('ansi-colors');
const { initLogger, status, warn, log } = require('./utils/logger');
const { logdeviceInfo } = require('./utils/infoLog.js');
const { usageLoad } = require('./utils/usageLoader.js');
const { infoLoad } = require('./utils/infoLoader.js');

const devConfigPath = './devconfig/config.json';
const regularConfigPath = './config.json';
let config;

if (fs.existsSync(path.dirname(devConfigPath))) {
    config = JSON.parse(fs.readFileSync(devConfigPath, 'utf-8'));
    status(`Using dev config.`);
} else {
    config = JSON.parse(fs.readFileSync(regularConfigPath, 'utf-8'));
    require('./utils/antiCrash.js')();
}

const client = new Client({ checkupdates: false });
const token = config.token;
let prefix = config.prefix;
client.commands = new Collection();

function getFilesRecursively(directory) {
    let files = [];
    const items = fs.readdirSync(directory, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(directory, item.name);
        if (item.isDirectory()) {
            files = files.concat(getFilesRecursively(fullPath));
        } else if (item.isFile() && fullPath.endsWith('.js')) {
            files.push(fullPath);
        }
    }

    return files;
}

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = getFilesRecursively(commandsPath);

for (const filePath of commandFiles) {
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
  rpc(client);
});

client.on('messageCreate', (message) => {
  if (message.author.bot || !message.content.startsWith(prefix) || message.author.id !== client.user.id) return;

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
  command.execute(message, args, prefix, client);
});

let client_info = {
  raidsEnabled: false,
  moreCmdSoonMessage: "✨ **More Commands Coming Soon!** ✨"
}
client.info = client_info;

function rpc(client) {
  if (!client || !client.user) {
    console.error("Client is not initialized or logged in.");
    return;
  }
  const rich = {
    name: "Hydrion S3LFB0T", 
    type: 'PLAYING', 
    state: "Using Selfbot",
    details: "Hydrion S3LFB0T",
    startTimestamp: Date.now(),
    largeImageKey: "hydrion_icon", 
    largeImageText: "Hydrion S3LFB0T",
    buttons: [
      {
        label: "Self Bot",
        url: "https://github.com/Hydrion-Tools/Hydrion-S3LFB0T"
      },
      {
        label: "Discord",
        url: "https://discord.gg/6Tufbvnebj"
      }
    ]
  };

  try {
    client.user.setActivity(rich);
    client.user.setPresence({ status: "online" });
    log("Started Discord RPC");
  } catch (error) {
    console.error("Failed to set status:", error);
  }
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
${colors.cyanBright(`╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░╚════╝░╚═╝░░╚══╝ SELFBOT v${VERSION}`)}
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

const isTermux = () => process.env.TERMUX_VERSION || require('fs').existsSync('/data/data/com.termux/files/usr');

if (isTermux()) {
  log('Running on Termux');
} else {
  logdeviceInfo();
}

startlogs();