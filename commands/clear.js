// removes all entries from the collection

const Discord = require('discord.js');
const {default: localizify} = require('localizify');
const { t } = require('localizify');

module.exports = {
	name: 'clear',
	description: 'Clear the database [DEVCMD]',

  async execute(message, args) {
    if (!["305771483865546752", "391984806638125066"].includes(message.author.id))  {
      message.delete();
      return;
    }
  
    message.client.db
      .set("guilds", {})
      .write()
    console.log("Database cleared.");
    message.reply("Database cleared.");
  }
}
  
