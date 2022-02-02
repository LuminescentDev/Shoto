module.exports = {
	name: "Log Channel",
	id: "logchannel",
	sqlvalue: "logChannelID",
	description: "The audit log / command log channel.",
	execute(client, interaction, args){
		try {
			if(!interaction.guild.channels.cache.get(args[1]) || !interaction.guild.channels.cache.get(args[1]).type === "GUILD_TEXT" || interaction.guild.channels.cache.get(args[1]).type === "GUILD_NEWS")return interaction.editReply({content: "Channel is either not from this guild or invalid please try again"});
			client.con.query(`UPDATE Settings Set logChannelID = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.editReply(`Setting: Log Channel Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting Log channel: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 