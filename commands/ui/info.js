const { log } = require('../../utils/logger');

module.exports = {
  name: 'info',
  aliases: ['i'],
  execute(message, args, prefix) { 
    const page = args[0] || 1;
    message.channel.send(loadinfomsg(page, prefix))
    log(`Info Command has been executed and page is ${page}`);
    
    message.delete();
  }
}

function loadinfomsg(page, prefix) {
  if(page == 1) {
    return(`
> ## 🌟 **Info Commands - Page 1** 🌟
> 📊 **Command List:**
> 📈 **${prefix}stats**
> 🏓 **${prefix}ping**
> 🔍 **${prefix}userinfo @user**
> 🖼️ **${prefix}pfp @user**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  if (page == 2) {
    return(`
> ## 🌟 **Info Commands - Page 2** 🌟
> 👥 **${prefix}roles @user**
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `)
  }
  else {
    return(`> ✨ **More Commands Coming Soon!** ✨`)
  }
}