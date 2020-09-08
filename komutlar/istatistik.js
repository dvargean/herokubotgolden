const Discord = require('discord.js');
let bot_version = process.env.VERSION;
let bot_sahip = process.env.SAHIP;
const moment = require("moment");
const os = require("os");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  const msg = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setFooter(`${message.author.username} Tarafından istendi.`,message.author.avatarURL())
    .setAuthor(`${client.user.username} - İstatistik:`)
    .addField("**Ram kullanımı**",`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``, true)
    .addField("**Çalışma süresi**",`\`${moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]")}\``,true)
    .addField("**Kullanıcılar**",`\`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\``,true)
    .addField("**Sunucular**",`\`${client.guilds.cache.size.toLocaleString()}\``,true)
    .addField("**Kanallar**",`\`${client.channels.cache.size.toLocaleString()}\``,true)
    .addField("**Discord.JS**", `\`v${Discord.version}\``, true)
    .addField("**Bot sürümü**",`\`v${bot_version}\``,  true)
    .addField("**Ping**", `\`${client.ws.ping}ms\`` , true)
    .addField("**Sahip**", `\`${bot_sahip}\``, true);
  return message.channel.send(msg);
};

exports.help = {
  name: "istatistik",
  guildOnly: false, // false olur ise DM'den de kullanılabilir bi hal alır | true olur ise sadece sunucuda kullanılabilir bir halde olur
  aliases: ["i"]
};




