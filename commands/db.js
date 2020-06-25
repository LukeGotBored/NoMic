

// removes all entries from the collection

const Discord = require('discord.js');
const {default: localizify} = require('localizify');
const { t } = require('localizify');

module.exports = {
	name: 'data',
	description: 'DB data [DEVCMD]',

  async execute(message, args) {
    var dbUsers = [];
    message.channel.send("```json\n" + JSON.stringify(message.client.db.value(), null, 4).slice(0, 1994) + "\n```")
  }
}
