const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = require("../botconfig/conf.json").prefix;
  this.prefix = prefix;
  this.bot = client.user;
  this.user = message.author;
  this.color = "BLUE";
  this.serverurl = "https://discord.gg/MgmHyg7Gfu";
  if(!args[0]) {
  let dc = new Discord.MessageEmbed()
  .setAuthor(this.user.username, this.user.displayAvatarURL({dynamic:true}))
  .setThumbnail(this.bot.displayAvatarURL({dynamic:true}))
  .setDescription(`Here is a list of commands!\nMade by [Archéx Development](${this.serverurl})!\nGiveaway Bot!`)
  .addField(`:gift: Giveaways (3)`, "`gstart`, `gend`, `greroll`")
  .addField(":tools: Utility (1)", "`userinfo`")
  .setColor(this.color)
  .setFooter(`${this.bot.username} | ${prefix}help [CMD Name]`, this.bot.displayAvatarURL({dynamic:true}))
  return message.channel.send(dc);
  }
  if(args[0] == "gstart") {
    return message.channel.send(new Discord.MessageEmbed().setTitle("Command Name: **gstart**").setDescription("Description: **Starts giveaways based on the time you specified, the number of gifts and winners!**\nUsage: **"+prefix+"gstart <time> <winner(s) count> <gift>**\nPermission(s): **Manage Messages**\nNote(s): **<> = optional**").setColor("BLUE").setFooter(this.bot.username, this.bot.displayAvatarURL({dynamic:true})))
  }

  if(args[0] == "gend") {
    return message.channel.send(new Discord.MessageEmbed().setTitle("Command Name: **gend**").setDescription("Description: **The message you specified ends the giveaways on your ID!**\nUsage: **"+prefix+"gend <giveawayId>**\nPermission(s): **Manage Messages**\nNote(s): **<> = optional**").setColor("BLUE").setFooter(this.bot.username, this.bot.displayAvatarURL({dynamic:true})))
  }

  if(args[0] == "greroll") {
    return message.channel.send(new Discord.MessageEmbed().setTitle("Command Name: **greroll**").setDescription("Description: **The message you specified reroll the giveaways in your ID!**\nUsage: **"+prefix+"greroll <giveawayId>**\nPermission(s): **Manage Messages**\nNote(s): **<> = optional**").setColor("BLUE").setFooter(this.bot.username, this.bot.displayAvatarURL({dynamic:true})))
  }

  if(args[0] == "userinfo") {
    return message.channel.send(new Discord.MessageEmbed().setTitle("Command Name: **userinfo**").setDescription("Description: **You look at your own or someone else's user information!**\nUsage: **"+prefix+"userinfo <user or none>**\nPermission(s): **Send Messages**\nNote(s): **<> = optional**").setColor("BLUE").setFooter(this.bot.username, this.bot.displayAvatarURL({dynamic:true})))
  }
};

exports.config = {
  name: "help",
  guildOnly: true,
  aliases: [],
};