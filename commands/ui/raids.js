const { log } = require('../../utils/logger');

module.exports = {
  name: 'raids',
  aliases: ['r', 'raid'],
  execute(message, args, prefix) {
    const page = args[0] || 1;
    message.channel.send(loadraidmsg(page, prefix))
    log(`Raids Command has been executed and page is ${page}`);
      
    message.delete();
  }
};

function loadraidmsg(page, prefix) {
  if (page == 1) {
    return(`
> ## 🚨 **Raids Commands - Page 1** 🚨
> ⚔️ **Command List:**
> 🌪️ **${prefix}spam**
> 💥 **${prefix}nuke**
> 🚀 **${prefix}raidstart**
> 🛡️ **${prefix}raidstop**
> 🔧 **${prefix}clear**
> 
> ✨ Selfbot crafted by \`@slaves\`
    `);
  }
  else if (page == 2) {
    return(`
> ## 🚨 **Raids Commands - Page 2** 🚨
> ⚔️ **Command List:**
> 🔨 **${prefix}deleteChannels**
> 🎭 **${prefix}deleteRoles**
> 🚫 **${prefix}banAllMembers**
> 🧹 **${prefix}clearAllMessages**
> 📁 **${prefix}deleteCategories**
> 🔥 **${prefix}destroy**
> 
> ✨ Selfbot crafted by \`@slaves\`
   `);
  }
  else {
    return('> ✨ **More Commands Coming Soon!** ✨');
  }
}
