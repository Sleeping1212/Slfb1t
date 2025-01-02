const { log } = require('../utils/logger');

module.exports = {
  name: 'raids',
  aliases: ['r', 'raid'],
  execute(message, args, prefix) {
    page = args[0] || 1;
    message.delete()
    message.reply(loadraidmsg(page, prefix));
    log(`Raids Command has been excuted and page is ${page}`)
  }
};

function loadraidmsg(page, prefix) {
  if (page == 1) {
    return(`
> ## 🚨 **Raids Commands - Page 1** 🚨
> ⚔️ **Command List:**
> 🌪️ **${prefix}spam <amount> <interval in ms> <msg>**           
> 💥 **${prefix}nuke**                                          
> 🚀 **${prefix}raidstart <msg>**                                
> 🛡️ **${prefix}raidstop**                                      
> 🔧 **${prefix}clear <number>**                                 
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `);
  }
  else if (page == 2) {
    return(`
> ## 🚨 **Raids Commands - Page 2** 🚨
> ⚔️ **Command List:**
> 🔨 **${prefix}deleteChannels**                           - Delete all channels in the server (requires confirmation)
> 🎭 **${prefix}deleteRoles**                              - Delete all roles in the server (requires confirmation)
> 🚫 **${prefix}banAllMembers**                            - Ban all members in the server (requires confirmation)
> 🧹 **${prefix}clearAllMessages**                         - Delete all messages across all channels (requires confirmation)
> 📁 **${prefix}deleteCategories**                         - Delete all categories in the server (requires confirmation)
> 🔥 **${prefix}destroy**                                  - Perform a full server wipe, deleting channels, roles, members, and categories (requires confirmation)
> 
> ✨ Selfbot crafted by \`@hydradevx\`
   `);
  }
   else {
    return('> ✨ **More Commands Coming Soon!** ✨');
  }
}
