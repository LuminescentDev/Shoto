const Discord = require("discord.js");
module.exports = {
	name: "invite",
	category: "utility",
	description: "Sends link to invite the bot",
	execute(client, interaction, args) {
		const invite = new Discord.MessageEmbed()
        .setTitle(client.user.username)
        .setDescription(`Thank you for choosing ${client.user.username}! We are still in devlopment so please report any bugs. [**Click Here To Invite ${client.user.username} To Your Server**](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot).`)
        .setColor(0x00AE86)
        .setThumbnail(client.user.displayAvatarURL);
		interaction.reply({embeds: [invite]});
	},
}; 