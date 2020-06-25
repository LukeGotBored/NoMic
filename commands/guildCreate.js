const Discord = require('discord.js');
const {default: localizify} = require('localizify');
const { t } = require('localizify');

module.exports = {
	name: 'guildcreate',
	description: 'bruh! [DEVCMD]',

  async execute(message, args) {
    message.client.emit("guildCreate", message.guild)
    message.channel.send("Simulated the GuildCreate event.")
  }
}