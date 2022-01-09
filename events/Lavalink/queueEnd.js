const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = async (client, player) => {

	const channel = client.channels.cache.get(player.textChannel);
	const emojiwarn = client.emoji.warn;
	let embed = new MessageEmbed()
		.setColor(client.embedColor)
		.setDescription(`${emojiwarn} **Music queue ended**`)
		.setFooter({text: client.user.username, iconURL: client.user.displayAvatarURL()});
	channel.send({embeds: [embed]});
}; 