const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client();
const dc = new Discord.Client();
require("./src/commandHandler/data.js")(client);

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./src/giveawayHandler/database.json",
  updateCountdownEvery: 15000,
  default: {
    botsCanWin: false,
    embedColor: "YELLOW",
    reaction: "🎉"
  }
});

client.on('ready', () => {
  console.log(`[BOT]: Logged in as ${client.user.tag}`);
  client.user.setPresence({ 
    activity: {
      name: `${require("./src/botconfig/conf.json").prefix}help | ${client.guilds.cache.array().length} servers!`
    },
    status: "idle"
  });
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./src/commands/", (err, files) => {
  if (err) console.error(err);
  console.log(`[BOT]: ${files.length} command will load.`);
  files.forEach(f => {
    let props = require(`./src/commands/${f}`);
    console.log(`[BOT]: ${props.config.name} command loaded.`);
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {
      client.aliases.set(alias, props.config.name);
    });
  });
});

client.login(require("./src/botconfig/conf.json").token).catch(error => { console.log("[BOT]: Token is invalid.")});
