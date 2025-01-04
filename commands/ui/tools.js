const { log } = require('../../utils/logger');

module.exports = {
  name: 'tools',
  aliases: ['t', 'tool'],
  execute(message, args, prefix) { 
    const page = args[0] || 1;
    message.channel.send(loadtoolsmsg(page, prefix))
    log(`Tools Command has been executed and page is ${page}`);
    
    message.delete();
  }
}

function loadtoolsmsg(page, prefix) {
  if(page == 1) {
    return(`
> ## 🚨 **Tools Commands - Page 1** 🚨
> ⚔️ **Command List:**
> 👤 **${prefix}kick @user**
> 🚫 **${prefix}ban @user**
> 🔓 **${prefix}unban userID**
> 🔇 **${prefix}mute @user duration**
> 📝 **${prefix}cloneserver <server id>**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  else {
    return(`> ✨ **More Commands Coming Soon!** ✨`)
  }
}