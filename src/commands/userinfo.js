const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
        let datenow = moment.utc(message.createdAt).format("MM DD YYYY");
        let userid = message.mentions.users.first() || message.author;
        this.name = userid.username;
        this.tag = userid.discriminator;
        this.mention = userid;
        this.id = userid.id;
        this.createdAt = moment
    .utc(message.guild.members.cache.get(userid.id).user.createdAt)
    .format("On **DD** of **MM**, **YYYY** (**MM/DD/YYYY**)")
    let userinfo = new Discord.MessageEmbed()
    .setAuthor(client.users.cache.get(this.id).username, client.users.cache.get(this.id).displayAvatarURL({dynamic:true}))
    .addField(":incoming_envelope: User Information:", `:white_small_square: ID: **${this.id}**\n:white_small_square: Name: **${this.name}**\n:white_small_square: Mention: ${this.mention}\n:white_small_square: Tag: **#${this.tag}**\n:white_small_square: Created At: ${this.createdAt}`)
    .setFooter(client.user.username, client.user.displayAvatarURL({dynamic:true}))
    .setThumbnail(client.user.displayAvatarURL({dynamic:true}))
    .setColor("BLUE")
    message.channel.send(userinfo);
};

exports.config = {
  name: "userinfo",
  guildOnly: true,
  aliases: ["ui", "user-info"],
};