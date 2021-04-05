const ms = require('ms');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.channel.send(":boom: You need the 'Manage Messages' permission to use this command!"
    )
  }

let messageID = args[0]
    if(!messageID){
        return message.channel.send(':x: You must provide a giveaway ID!');
    }
client.giveawaysManager.reroll(messageID, {
    messages: {
        congrat: ":tada: The new winner is : {winners}! Congratulations!",
        error: ":x: No valid participation, no winner can be selected!"
                    }   
}).catch((err) => {
    message.channel.send(":x: `"+ messageID +"` did not find any giveaways for, please check and try again");
})
}

exports.config = {
  name: "greroll",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};