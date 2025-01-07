const { log } = require('../../utils/logger');

module.exports = {
  name: 'profile',
  aliases: ['p'],
  execute(message, args, prefix) { 
    const page = args[0] || 1;
    message.channel.send(loadprofilemsg(page, prefix))
    log(`Profile Command has been executed and page is ${page}`);
    
    message.delete();
  }
}

function loadprofilemsg(page, prefix) {
  if(page == 1) {
    return(`
> ## 👤 **Profile Commands - Page 1** 👤
> 🔍 **Command List:**
> 💤 **${prefix}afk**
> 🚶‍♂️ **${prefix}unafk**
> 🎮 **${prefix}play**
> 🎥 **${prefix}stream**
> 📺 **${prefix}watch**
> 🎶 **${prefix}listen**
> ⏹️ **${prefix}stopactivity**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  else if(page == 2) {
    return(`
> ## 👤 **Profile Commands - Page 2** 👤
> 🔍 **Command List:**
> 🔴 **${prefix}dnd**
> 🌙 **${prefix}idle**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
      `)
  }
  else {
    return(`> ✨ **More Commands Coming Soon!** ✨`)
  }
}
