const Discord = require('discord.js');
const {default: localizify} = require('localizify');
const { t } = require('localizify');

module.exports = {
	name: 'say',
	description: 'talk like a pro!',


async execute(message, args) {
  const tick = message.client.emojis.cache.get(655807079784644608);
  const cross = message.client.emojis.cache.get( 655807081240330245);
  var ttsMessage = args.join(" ")
  
  var ttsLink = "http://getparty.ml/hear?text=" + encodeURIComponent(ttsMessage) + "&lang=it"
  
  if (message.member.voice.channel) {
		const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play(ttsLink);
	}
  else{
    message.channel.send(cross + " You're not in a voice chat!")
  }

  }
}
  
