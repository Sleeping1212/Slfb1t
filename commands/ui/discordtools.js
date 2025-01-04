const { log } = require('../../utils/logger');

module.exports = {
  name: 'discordtools',
  aliases: ['dt', 'dsicord', 'discordt', 'dst'],
  execute(message, args, prefix) {
    const page = args[0] || 1;
    message.channel.send(loaddiscordtoolsmsg(page, prefix))
    log(`discordtools Command has been executed and page is ${page}`);

    message.delete();
  }
}

function loaddiscordtoolsmsg(page, prefix) {
  if (page == 1) {
    return(`
> ## 🛠️ **Discord Tools - Page 1** 🛠️
> 🔍 **Command List:**
> 📌 **${prefix}pin [messageID]**
> 🧹 **${prefix}purge @user [number]**
> 🔒 **${prefix}lock**
> 🔓 **${prefix}unlock**
> 📄 **${prefix}archive [number]**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
      `);
  }else if (page == 2) {
    return(`
> ## 🛠️ **Discord Tools - Page 2** 🛠️
> 🔍 **Command List:**
> 📢 **${prefix}announce [message]**
> ⚠️ **${prefix}warn @user <reason>**
> 💬 **${prefix}quote <message>**
> 🐌 **${prefix}slowmode <time>**
> 🌐 **${prefix}translate <lang> <text>**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
      `);
  } else if (page == 3) { 
    return(`
> ## 🛠️ **Discord Tools - Page 3** 🛠️
> 🔍 **Command List:**
> 📊 **${prefix}poll <question>**
> ⏰ **${prefix}remind <time> <message>**
> 📬 **${prefix}dm @user <message>**
> 👥 **${prefix}roles @user**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
      `);
    }else {
        return('> ✨ **More Commands Coming Soon!** ✨');
    }
}