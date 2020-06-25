const Discord = require('discord.js');
const {default: localizify} = require('localizify');
const { t } = require('localizify');

module.exports = {
	name: 'say',
	description: 'talk like a pro!',
  
  
  async execute(message, args) {
    const tick = message.client.emojis.cache.get("655807079784644608");
    const cross = message.client.emojis.cache.get("655807081240330245");
    
    var ttsMessage = args.join(" ")
    
    // replace mentions
    ttsMessage = ttsMessage.replace(/<(@!|@&|#)?(\d{18})>/, (match, type, id) => {
      if (type === "@" || type === "@!") // user
        return "@ " + (message.guild.member(message.client.users.cache.get(id)) || { displayName: "unknown user" }).displayName
      else if (type === "@&") // role
        return "@ " + (message.guild.roles.cache.get(id) || { name: "deleted role" }).name
      else if (type === "#") // channel
        return "# " + (message.guild.channels.cache.get(id) || { name: "deleted channel" }).name
    })
    
    const { lastTTSMessage } = message.guild;
    if ((lastTTSMessage && (lastTTSMessage.author.id !== message.author.id)) || !lastTTSMessage) {
      ttsMessage = t("v_says", { user: message.member.displayName, text: ttsMessage })
    }
    var ttsURL = "http://getparty.ml/hear?text=" + encodeURIComponent(ttsMessage) + "&lang=fr"

    
    if (message.member.voice.channel) {
      const connection = await message.member.voice.channel.join();
      const dispatcher = connection.play(ttsURL);
      message.guild.lastTTSMessage = message;
    } else {
      message.channel.send(t("e_noVC"))
    }
  }
}  
  
