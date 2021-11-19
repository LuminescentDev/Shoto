const Discord = require("discord.js");
module.exports = {
	name: "donate",
	category: "utility",
	description: "Sends link to donate url",
	execute(client, interaction, args) {
		const donate = new Discord.MessageEmbed()
            .setTitle(`Support ${client.user.username}`)
            .setDescription("Donating helps support development and hosting costs")
            .setURL(`https://donatebot.io/checkout/740705740221841450?buyer=${interaction.member.user.id}`)
			.setFooter("Cant donate? Voting helps just as much! https://top.gg/bot/796935151417688074/vote")
            .setImage(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));
		interaction.editReply({embeds: [donate]});
	},
}; 