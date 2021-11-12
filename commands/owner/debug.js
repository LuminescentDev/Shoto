const Discord = require("discord.js");
module.exports = {
	name: "debug",
	cooldown: 0,
	category: "owner",
	description: "Change debug mode!",
	msgcmd: true,
	owner: true,
	args: true,
	async execute(client, interaction, args) {
		if(!args){
			interaction.reply(client.debug);
		}else{
			client.debug = args[0];
			interaction.reply(client.debug);
		}
	},
}; 