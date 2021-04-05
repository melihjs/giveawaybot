const ms = require('ms');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.channel.send(":boom: You need the 'Manage Messages' permission to use this command!"
    );
  }

    if(!args[0]){
        return message.channel.send(':x: You must provide a giveaway ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send(':x: There is no such giveaway on the server!');
    }

    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    .then(() => {
        message.channel.send(':x: The giveaway will end in a short time...').then(a => a.delete({timeout: 10000}));
    })
    .catch((e) => {
        if(e.startsWith(`:x: This giveaway ID ${giveaway.messageID} is already finished.`)){
            message.channel.send(':x: This giveaway is already over!');
        } else {
            console.error(e);
            message.channel.send(':x: There was an error...');
        }
    });

};

exports.config = {
  name: "gend",  //komutunuzun adı
  guildOnly: true, //burası kalsın
  aliases: [],  //komutu farklı isimde çalıştırmak için 
};