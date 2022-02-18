  
const Discord = require('discord.js');
const ayarlar = require("../ayarlar.json")
const { Database } = require("quickmongo");
const data = new Database(ayarlar.mongourl);


exports.run = async (client, message, args) => {
const prefix = await data.fetch(`prefix.${message.guild.id}`) || client.ayarlar.prefix;
  
if(!args[0]) {
message.delete()
return message.channel.send(`Komutu düzgün kullanın: \`[Etiket/Rol] (kanal)\``).then(m => m.delete({timeout: 5000})) }
  
if(args[0]) {

if(!args[1]) {
const ad = await data.fetch(`numara.${message.channel.id}`)
if(!message.channel.name === `ticket-${ad}` || message.channel.name === `closed-${ad}`) {
message.delete()
return message.channel.send(`Bu komutu bir bilet kanalında kullanın.`).then(c => c.delete({timeout: 5000})) } }
const ann = await data.fetch(`asd.${message.guild.id}.${message.channel.id}.${message.author.id}`)
if(!ann) return message.channel.send(`Bu bilet senin değil.`)
let mt = message.mentions.roles.first() || message.mentions.users.first()
if(!mt) {
message.delete()
return message.channel.send(`Komutu düzgün kullanın: \`[Etiket/Rol] (kanal)\``)  }
let mention = message.guild.roles.cache.get(mt.id) || message.guild.members.cache.get(mt.id)
if(!mention) {
message.delete()
return message.channel.send(`Komutu düzgün kullanın: \`[Etiket/Rol] (kanal)\``)  }  
  
if(args[1]) {  
  
if(message.mentions.channels.first()) {
  
let ch = message.mentions.channels.first()
const ad = await data.fetch(`numara.${message.channel.id}`)
if(!ch.name === `ticket-${ad}` || ch.name === `closed-${ad}`) {
message.delete()
return message.channel.send(`Bir bilet kanalı değil.`).then(c => c.delete({timeout: 5000})) }
const ann = await data.fetch(`asd.${message.guild.id}.${ch.id}.${message.author.id}`)
if(!ann) return message.channel.send(`Bu bilet senin değil.`)
ch.createOverwrite(mt, { 'SEND_MESSAGES': null, 'VIEW_CHANNEL': null })
message.delete()
const emb = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`${mt}: ${ch} kanalından kaldırıldı.`)
return message.channel.send(emb) } }
  
message.channel.createOverwrite(mt, { 'SEND_MESSAGES': null, 'VIEW_CHANNEL': null})
message.delete()
const emb = new Discord.MessageEmbed()
.setColor('RED')
.setDescription(`${mt}: ${message.channel} kanalından kaldırıldı.`)
return message.channel.send(emb)

}

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kaldır'],
  permLevel: 0
}

exports.help = {
  name: 'sil',
    kategori: "ticket"
};