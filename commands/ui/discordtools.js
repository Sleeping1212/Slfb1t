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
> 📌 **${prefix}pin**
> 🔒 **${prefix}lock**
> 🔓 **${prefix}unlock**
> 📄 **${prefix}archive**
> 📄 **${prefix}cloneserver**
> 
> ✨ Selfbot crafted by \`@slaves\`
      `);
  }else if (page == 2) {
    return(`
> ## 🛠️ **Discord Tools - Page 2** 🛠️
> 🔍 **Command List:**
> 📢 **${prefix}announce**
> ⚠️ **${prefix}warn**
> 💬 **${prefix}quote**
> 🐌 **${prefix}slowmode**
> 🌐 **${prefix}translate**
> 
> ✨ crafted by \`@slaves\`
      `);
  } else if (page == 3) { 
    return(`
> ## 🛠️ **Discord Tools - Page 3** 🛠️
> 🔍 **Command List:**
> 📊 **${prefix}poll**
> ⏰ **${prefix}remind**
> 📬 **${prefix}dm**
> ✨ crafted by \`@slaves\`
      `);
    }else {
        return('> ✨ **More Commands Coming Soon!** ✨');
    }
}
