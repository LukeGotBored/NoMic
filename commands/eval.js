const Discord = require("discord.js");

module.exports = {
  name: "eval",
  description: "a developer command, please do not use this",
  aliases: [],
  guildOnly: false,

  execute(message, args) {
    const trim = (str, max) =>
      str.length > max ? `${str.slice(0, max - 3)}...` : str;

    const client = message.client;
    const guild = message.guild;
    var cross = client.emojis.cache.get("655807081240330245")
    var tick = client.emojis.cache.get("655807079784644608")
    
    async function exec() {
      if (!["305771483865546752", "391984806638125066"].includes(message.author.id))  {
        message.delete();
        return;
      }

      let evaled;
      try {
        if (args == "") {
          message.react(cross);
          message.channel.send(cross.toString() + " Nothing to execute!");
          return;
        }
        evaled = await eval(args.join(" "));
        message.react(tick);
        const donemb = new Discord.MessageEmbed()
          .setColor("#43b581")
          .setTitle(tick.toString() + " Done!")
          .addField("📥 Input:", "```js\n" + trim(args.join(" "), 256) + "```")
          .addField("📤 Input:", "```js\n" + trim(evaled, 256) + "```")
          .setTimestamp()
          .setFooter("NoMic");
        message.channel.send(donemb);
      } catch (error) {
        message.react(cross);
        const flipemb = new Discord.MessageEmbed()
          .setColor("#ff0000")
          .setTitle(cross.toString() + " Oh Noes!")
          .addField("Eval failed:", "```js\n" + error + "```")
          .setTimestamp()
          .setFooter("Party!", "https://i.imgur.com/B6QKBgC.png");
        message.channel.send(flipemb);
      }
    }

    exec();
  }
};
