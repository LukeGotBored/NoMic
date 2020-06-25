const Discord = require('discord.js');
const {default: localizify} = require('localizify');
const { t } = require('localizify');

module.exports = {
	name: 'setlocale',
	description: 'sets the locale!',


async execute(message, args) {
    const langs = [
      "de",
      "en",
      "es",
      "fr",
      "it"
    ]
  
    if(!langs.includes(args[0]).toLowerCase()){
      return message.channel.send(t("e_unknownLang"))
    }
  
    message.client.db.get(`guilds.${message.guild.id}`)
      .set({ locale: args[0].toLowerCase()})
      .write()
    message.channel.send(t("a_langSet"))

  }
}
  
