const { MessageEmbed } = require("discord.js");

module.exports = async (client, player, track, payload) => {
    
	const channel = client.channels.cache.get(player.textChannel);
	const embed = new MessageEmbed()
        .setColor("RED")
        .setDescription("❌ Error when loading song! Track is stuck");
	channel.send({embeds: [embed]});
	client.logger.error(`Error when loading song! Track is stuck in [${player.guild}]`);
	if (!player.voiceChannel) player.destroy();

};