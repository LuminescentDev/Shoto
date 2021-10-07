const { MessageEmbed } = require("discord.js");
const { convertTime } = require("../../utilities/convert.js");

function sleep(ms) {
	return new Promise(res => setTimeout(res, ms));
}

module.exports = async (client, player, track, payload) => {

	const channel = client.channels.cache.get(player.textChannel);
	const emojiplay = client.emoji.play;

	const embed = new MessageEmbed()
        .setDescription(`${emojiplay} **Started Playing**\n [${track.title}](${track.uri}) - \`[${convertTime(track.duration)}]\` [<@${track.requester.id}>]`)
        .setThumbnail(track.displayThumbnail("3"))
        .setColor(client.embedColor)
        .setTimestamp();
	return channel.send({embeds: [embed]}).then(async msg => {
		await sleep(60000);
		msg.delete();
	});
    
};