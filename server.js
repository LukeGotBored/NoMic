const fs = require("fs");
const Discord = require('discord.js');
const express = require("./express.js"); 
const { prefix, status } = require('./config.json');
const { default: localizify } = require('localizify');
var low = require('lowdb')
var FileSync = require('lowdb/adapters/FileSync')
var adapter = new FileSync('.data/db.json')
var db = low(adapter)


db.defaults({ guilds: {} })
  .write()

Discord.Structures.extend("Guild", Guild => class NMGuild extends Guild {
  constructor(client, data) {
    super(client, data);
    this.lastTTSMessage = null;
  }
})


const client = new Discord.Client();
client.db = db;
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


const activities_list = [
  "the micless users!",
  "the community!",
  "everyone!"
];

//
client.once('ready', () => {
	console.log('Ready! ' + Date.now());
  client.user.setActivity("feedback!", { type: 'LISTENING' })
   setInterval(() => {
     const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
     client.user.setActivity(activities_list[index], { type: "LISTENING" });
   }, 10000);
});



client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

  try {
	  command.execute(message, args);
  } catch (error) {
	  console.error(error);
	  message.reply('uh oh! something went **really** wrong!');
  }
    
});


client.on("guildCreate", guild => {
    client.channels.cache.get("725759979730108517").send("bruhbru just joined this guild whaddup")
    db.set(`guilds.${guild.id}`, { id: guild.id, prefix, locale: "en" })
      .write()
    console.log(`New guild! ID: ${guild.id}`)
})


// Languages Loader 
const en = require('./locale/en.json');
const fr = require('./locale/fr.json');
const it = require('./locale/it.json');
const es = require('./locale/es.json');

localizify
  .add('en', en)
  .add('fr', fr)
  .add('it', it)
  .add('es', es)
  .setLocale('en');



client.login(process.env.TOKEN)
  .then(console.log("Successfully logged in!"));