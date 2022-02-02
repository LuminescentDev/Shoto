const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {

	const channel = client.channels.cache.get(player.textChannel);
	const emojiplay = client.emoji.play;

	const embed = new MessageEmbed()
        .setDescription(`${emojiplay} **Started Playing**\n [${track.title}](${track.uri}) - \`[${convertTime.convertTime(track.duration)}]\` [<@${track.requester.id}>]`)
        .setThumbnail(track.displayThumbnail("3"))
        .setColor(client.embedColor)
        .setTimestamp();
	return channel.send({embeds: [embed]});
}; 