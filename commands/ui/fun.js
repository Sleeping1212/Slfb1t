const { log } = require('../../utils/logger');

module.exports = {
  name: 'fun',
  aliases: ['f'],
  execute(message, args, prefix) { 
    const page = args[0] || 1;
    message.channel.send(loadfunmsg(page, prefix))
    log(`Fun Command has been executed and page is ${page}`);
    
    message.delete();
  }
}

function loadfunmsg(page, prefix) {
  if(page == 1) {
    return(`
> ## 🎉 **Fun Commands - Page 1** 🎉
> 🕹️ **Command List:**
> 💖 **${prefix}rizz**
> 😂 **${prefix}joke**
> 🎱 **${prefix}8ball**
> 🪙 **${prefix}coinflip**
> 🤣 **${prefix}meme**
> 
> ✨ Selfbot crafted by \`@slaves\`
    `)
  }
  else if(page == 2) {
    return(`
> ## 🎉 **Fun Commands - Page 2** 🎉
> 🕹️ **Command List:**
> 🌈 **${prefix}gay**
> 💻 **${prefix}skid**
> 
> ✨ Selfbot crafted by \`@slaves\`
      `)
  }
  else {
    return(`> ✨ **More Commands Coming Soon!** ✨`)
  }
}
