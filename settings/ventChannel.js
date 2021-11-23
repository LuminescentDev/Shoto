module.exports = {
	name: "Vent Channel",
	id: "ventchannel",
	sqlvalue: "ventChannelID",
	description: "The channel that messages from the vent command will be sent to.",
	execute(client, interaction, args){
		try {
			if(!interaction.guild.channels.cache.get(args[1]) || !interaction.guild.channels.cache.get(args[1]).type === "GUILD_TEXT")return interaction.editReply({content: "Channel is either not from this guild or invalid please try again", ephemeral: true});
			client.con.query(`UPDATE Settings Set ventChannelID = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.editReply(`Setting: Vent Channel Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting ventChannel: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 