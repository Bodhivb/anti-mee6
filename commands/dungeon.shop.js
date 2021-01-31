//Dungeon commands
const Discord = require("discord.js");
const dungeon = require("../libraries/dungeon");

module.exports.config = {
  name: "shop",
  description: "Shop dungeon items",
  usage: "shop",
  admin: false,
};

module.exports.run = async (bot, message, args) => {
  const items = await dungeon.GetItems();

  const embed = new Discord.MessageEmbed().setTitle("Shop items:");
  embed.setColor("#0099ff");

  items.forEach((item) => {
    embed.addFields({
      name: `${item.emoji ? item.emoji + " " : ""}${item.name} - ${item.buy} gold`,
      value: item.description,
    });
  });

  message.channel.send(embed);
};
