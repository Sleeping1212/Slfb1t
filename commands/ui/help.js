const { log } = require('../../utils/logger');

module.exports = {
  name: 'help',
  aliases: ['h'],
  execute(message, prefix) {
    message.channel.send(helpmsg(prefix));

    log(`Help Command has been excuted`);
    message.delete();
  },
}

function helpmsg(prefix) {
  return(`
> ✨ **${prefix}[section] [page] ? Default is 1** ✨
> 
> 🔨 **${prefix}raids**
> 📊 **${prefix}info**
> 🎲 **${prefix}fun**
> 🛠️ **${prefix}tools**
> 📡 **${prefix}discordtools**
> 👤 **${prefix}profile**
> 
> ✨ Add --info or --usage After a Command to Get more Information about it.
> ✨ Selfbot crafted by \`@slaves\`

    `)
}
