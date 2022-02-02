const Discord = require("discord.js");
module.exports = {
	name: "debug",
	cooldown: 0,
	category: "owner",
	description: "Change debug mode!",
	botPermissions: [],
	msgcmd: true,
	owner: true,
	async execute(client, message, args) {
		if(!args){
			message.reply(`debug set to: ${client.debug}`);
		}else{
			client.debug = args[0];
			message.reply(`debug set to: ${client.debug}`);
		}
	},
}; 