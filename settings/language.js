module.exports = {
	name: "Join Channel",
	id: "joinchannel",
	sqlvalue: "joinChannelID",
	description: "The channel that all join / leave messages will be sent to.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set language = "${args[1]}" where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting language: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
};