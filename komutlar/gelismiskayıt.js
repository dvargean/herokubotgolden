//ROL AYARLAMA



const Discord = require('discord.js')
const fs = require('fs');


exports.run = async (client, message, args) => {

  const db = require('quick.db');
  

  let role = message.mentions.roles.first() || message.guild.roles.find(r => r.name === args.slice(0).join(' '));
  let prefix = await db.fetch(`prefix_${message.guild.id}`) || client.ayarlar.prefix;
  
  
  

    if(args[0] === 'kapat') {
   if (db.has(`kayıtR_${message.guild.id}`) === true) {
     message.channel.send(`Kayıt rolü başarıyla kaldırıldı`)
     db.delete(`kayıtR_${message.guild.id}`)
     return
}
  message.channel.send(`kayıt rolü ayarlanmamış.`)
    return
  
  }

  
  
    if (!role) {
        return message.reply(`Lütfen bir rol etiketleyin veya rol adını yazın örnek: **${prefix}kayıtrol @rol** veya **${prefix}kayıtrol rol-adı** `)
    }

  
     db.set(`kayıtR_${message.guild.id}`, role.id)
  
    const embed = new Discord.RichEmbed()
    .setDescription(` Kayıt rolü başarıyla ayarlandı: **${role.name}**\nKayıt rolünü kapatmak isterseniz **${prefix}kayıtrol kapat** yazmanız yeterlidir.`)
    .setColor("RANDOM")
    message.channel.send({embed})
  
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kayıt-rol', 'kayıt-rol-belirle'],
    permLevel: 4,
    kategori: "ayarlar",
}

exports.help = {
    name: 'kayıtrol',
    description: 'Kayıt olunca verilecek rolü ayarlar.',
    usage: 'kayıtrol <@rol> \ rol-adı',
}
//KAYIT OLMA


const Discord = require('discord.js');
const Jimp = require('jimp');


exports.run = async (bot, message, args) => {
var user = message.author;  
  const db = require('quick.db');
  
  if(db.has(`kayıtR_${message.guild.id}`) === true) {
    
if (!message.guild) return message.reply(`Bu komutu sunucularda kullanabilirsin.`);
              
  
const filter = m => m.author.id === message.author.id;

if(message.member.roles.has(db.fetch(`kayıtR_${message.guild.id}`)) === true) return message.channel.send(`Zaten sende **` + message.guild.roles.get(db.fetch(`kayıtR_${message.guild.id}`)).name + `** rolü bulunuyor.`)

   var s = [
"(XQ2iAHq",
"]4sk3.,[",
"@h13q/?y",
"*3A;ZN/[",
"(w6+3me",
"[AzUs!vx",
"[969oK&!",
"/jx]Wvae",
"?taKx0rS",
"7b1H0+y",
"!c4e[Q*w",
"=iCMp9_-",
"[KrqjC6]",
"]PfL5-#[",
"-xG8E\&2",
"\qmVgzic",
")xKKLF@L",
"[d1DBnhj",
"]Cvb90E0",
":A1sG_%9",
"#sOW*Xgh",
"#8WXjfVf",
"=XJ6znz=",
"_FrvMM@7",
")ca58PTa",
"(MY;e?/.",
"'53wSHGQ",
";ZkBm#(7",
"_Y6BVRp3",
"&LnyTO16",
"@2ZY6edQ",
"'ML4X%*,",
"/8Mnv$mP",
"(2uagC/N",
".XcLLsre",
"-K6Vp9Qi",
"#HYsi;3e",
";PzP@M%r",
"_CzW:viy",
"@sOyV[(U",
",WXNzvRw",
")g6ZcT+W",
"]zwb8T2n",
"&k7Q1Oa@",
"@QOaqP-4",,
"%Pe!VB]h",
"]6G7(XH3",
"@5E&MJ=5",
"@4T6O&*k",
"_jXcUM!J",

     
];
  

  
  var sifre = s[Math.floor((Math.random() * s.length))];

const embed = new Discord.RichEmbed()

  .setColor('#FFB900')
  .setTitle('Komut Girişi')
  .setDescription(`Kayıt olmak için **${sifre}** bu kodu doğru bir şekilde yazınız.`)
  .setFooter('Komutu iptal etmek için "iptal" yazın veya otomatik 2 dakika içinde iptal edilecektir.')
message.channel.send(embed)
.then(async () => {
    message.channel.awaitMessages(filter, {
    max: 1,
    time: 200000
  }).then(async (collected) => {
   if (collected.first().content === sifre) { 
     message.reply("Şifreyi doğru girdiniz ve rolünüz verilmiştir.")
     message.member.addRole(db.fetch(`kayıtR_${message.guild.id}`))
     
     return
   } 
      message.channel.send('Şifreyi yanlış girdiniz komut iptal oldu birdahaki sefere daha iyi yazın ve boşluk bırakmayın.')
  
})
})
}
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  kategori: "sunucu"
};

exports.help = {
  name: 'kayıtol',
  description: '.',
  usage: ''
};