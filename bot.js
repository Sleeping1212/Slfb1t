const { Client, Presence } = require('discord.js-selfbot-v13');
const fs = require('fs');
const path = require('path');
const config = fs.readFileSync('config.json');
const { checkUpdate } = require('./updater.js');
const cp = require("child_process");
const Json = require("./package.json");

const client = new Client({ checkupdates: false });
const token = config.token;

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);
  try {
      await checkUpdate(client, cp, Json);
  } catch (error) {
      console.error('Update error:', error);
  }
});


client.on('messageCreate', (message) => {
  if (message.author.id !== client.user.id) return;

  const args = message.content.split(' ');
  const command = args.shift().toLowerCase();

  if (commands[command]) {
      commands[command](message, args);
  }
});

client.login(token);