const fs = require("fs");

module.exports = (bot) => {
  /** Loads each command in "commands" folder */
  bot.loadCommands = () => {
    console.log("Loading commands...");
    try {
      fs.readdirSync("./commands/").forEach((file) => {
        //Only js code may be loaded
        if (!file.endsWith(".js")) return;

        const command = require(`../commands/${file}`);
        const commandName = command.config.name;
        command.config.file = file;
        bot.commands.set(commandName, command);
        console.log(`Loaded command ${commandName} (${file})`);
      });
    } catch (err) {
      console.log(`Error while loading commands. ${err}`);
    }
  };

  /** Unloads each command in "commands" folder */
  bot.unloadCommands = () => {
    console.log("Unloading commands...");
    try {
      fs.readdirSync("./commands/").forEach((file) => {
        //Only js code is loaded
        if (!file.endsWith(".js")) return;
        try {
          delete require.cache[require.resolve(`../commands/${file}`)];
        } catch {}
      });
      bot.commands.clear();
    } catch (err) {
      console.log(`Error while unloading commands. ${err}`);
    }
  };
};
