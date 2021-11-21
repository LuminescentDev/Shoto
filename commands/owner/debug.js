const Discord = require("discord.js");
module.exports = {
	name: "debug",
	cooldown: 0,
	category: "owner",
	description: "Change debug mode!",
	msgcmd: true,
	owner: true,
	args: true,
	async execute(client, message, args) {
		if(!args){
			message.reply(client.debug);
		}else{
			client.debug = args[0];
			message.reply(client.debug);
		}
	},
}; 