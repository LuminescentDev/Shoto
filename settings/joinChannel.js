module.exports = {
	name: "Join Channel",
	id: "joinchannel",
	sqlvalue: "joinChannelID",
	description: "The channel that all join / leave messages will be sent to.",
	execute(client, interaction, args){
		try {
			if(!interaction.guild.channels.cache.get(args[0]) || !interaction.guild.channels.cache.get(args[0].type === "GUILD_TEXt"))return interaction.editReply({content: "Channel is either not from this guild or invalid please try again",  ephemeral: true});
			client.con.query(`UPDATE Settings Set joinChannelID = "${args[1]}" where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting joinChannel: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 