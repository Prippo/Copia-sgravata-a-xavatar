const Discord = require("discord.js") 

module.exports.run = async (client, message, args) => {

const embed = new Discord.MessageEmbed() 

.setTitle("Commands")

.setDescription("edit with your commands...")

message.channel.send(embed)

}
