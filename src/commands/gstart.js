const Discord = require("discord.js")
const ms = require("ms");
const client = new Discord.Client();

exports.run = async (client, message, args) => {
  
  let prefix = require("../botconfig/conf.json").prefix;
  if (
    !message.member.hasPermission("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.channel.send(":boom: You need the 'Manage Messages' permission to use this command!"
    );
  }

    // Giveaway duration
    let giveawayDuration = args[0];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(`:boom: Please specify the material of the draw, duration and number of winners!\nExp: **${prefix}gstart 10m 1 Nitro**`);
    }

    // Number of winners
    let giveawayNumberWinners = args[1];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(`:boom: Please specify the material of the draw, duration and number of winners!\nExp: **${prefix}gstart 10m 1 Nitro**`);
    }

    // Giveaway prize
    let giveawayPrize = args.slice(2).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(`:boom: Please specify the material of the draw, duration and number of winners!\nExp: **${prefix}gstart 10m 1 Nitro**`);
    }

    // Start the giveaway
    client.giveawaysManager.start(message.channel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: require("../giveawayHandler/config.json").hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (require("../giveawayHandler/config.json").everyoneMention ? "@everyone\n\n" : "")+":tada: **GIVEAWAY** :tada:",
            giveawayEnded: (require("../giveawayHandler/config.json").everyoneMention ? "@everyone\n\n" : "")+":tada: **GIVEAWAY ENDED** :tada:",
            timeRemaining: "Time remaining: **{duration}**!",
            inviteToParticipate: "React with :tada: to enter!",
            winMessage: "Congratulations {winners}! You won the **{prize}**!",
            embedFooter: "🎉",
            noWinner: "No valid participation, no winner can be selected!",
            hostedBy: "Hosted by: {user}",
            winners: "winner(s)",
            endedAt: "Ended at",
            units: {
                seconds: "seconds",
                minutes: "minutes",
                hours: "hours",
                days: "days",
                weeks: "weeks",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });
  message.delete();

};

exports.config = {
  name: "gstart",
  guildOnly: true,
  aliases: [], 
};