const Discord = require("discord.js");
const client = new Discord.Client();
const express = require("express");
const app = express();
const moment = require("moment");

let bot_version = process.env.VERSION;

const fs = require("fs");

 //Uptime için başladı
app.get("/", (req, res) => {
  res.send("BOT ONLINE");
});
app.listen(process.env.PORT);
//Uptime için bitti

//Komutları Yükleme Başladı
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let cmd = require(`./komutlar/${file}`);
    let cmdFileName = file.split(".")[0];
    client.commands.set(cmd.help.name, cmd);
    console.log(`Komut Yükleme Çalışıyor: ${cmdFileName}`);
    if (cmd.help.aliases) {
      cmd.help.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
    }
  });
});
//Komutları yükleme bitti

//Events Yükleyici başladı
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    console.log(`Etkinlik Yükleme Çalışıyor: ${eventName}`);
    client.on(eventName, event.bind(null, client));
  });
});
//Events yükleyici bitti

client.on("ready", () => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${client.user.username} (${client.user.id}) ismi ile giriş yapıldı!`);
  client.user.setActivity(`7/24 Online | v${bot_version}` ,  { type: "STREAMING" }, {url: "https://discord.com"} )});
client.login(process.env.TOKEN);
