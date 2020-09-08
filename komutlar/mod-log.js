//AYARLAMA KODU




const Discord = require('discord.js');
const db = require('quick.db')
let bot_prefix = process.env.PREFİX

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!**`)
 
 let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
    let kanal = message.mentions.channels.first();
    if(!kanal) return message.reply(`**Lütfen bir kanal giriniz!** \n> **Doğru Kullanım;** \`${prefix}modlogayarla <#kanal>\``)

    db.set(`modlogkanaly_${message.guild.id}`, kanal.id)
    const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
    message.channel.send(`> **Modlog kanalı başarılı bir şekilde ayarlandı.**`)
    
    } else {
      if(modlogs) {
        
        const modlogkanal = message.guild.channels.find(kanal => kanal.id === modlogs);
        return message.channel.send(`**Bu sunucuda daha önceden modlog kanalı ayarlanmış. Sıfırlamak için:** ||${prefix}modlogayarla-sıfırla||\n**Ayarlanan kanal:** \`${modlogkanal.name}\``)
        
      }
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['modlog'],
    permLevel: 0
}

exports.help = {
    name: 'mod-log',
    description: 'Log kanalını belirler.',
    usage: 'modlog <#kanal>'
}
//SIFIRLAMA KODU


const Discord = require('discord.js');
let bot_prefix = process.env.PREFİX
const db = require('quick.db')

const prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!**`)
  
  let modlogs = db.get(`modlogkanaly_${message.guild.id}`)
  
  if(!modlogs) {
    return message.channel.send(`> **Bu sunucuda daha önceden modlog kanalı ayarlanmamış. Ayarlamak için:** \`${prefix}modlog-ayarla <#kanal>\``)
  } else {
    if(modlogs) {    
      db.delete(`modlogkanaly_${message.guild.id}`)
      message.channel.send(`> **Modlog kanalı başarılı bir sıfırlandı!**`)
    }
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["modlog-sıfırla"],
    permLevel: 0
}

exports.help = {
    name: 'modlog-sıfırla',
    description: 'Sıfırlar.',
    usage: 'modlog-sıfırla'
}
