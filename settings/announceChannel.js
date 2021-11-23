module.exports = {
	name: "Announcement Channel",
	id: "announcechannel",
	sqlvalue: "AchannelID",
	description: "The where the announce command will send messages.",
	execute(client, interaction, args){
		try {
			if(!interaction.guild.channels.cache.get(args[1]) || !interaction.guild.channels.cache.get(args[1]).type === "GUILD_TEXT" || interaction.guild.channels.cache.get(args[1]).type === "GUILD_NEWS")return interaction.reply({content: "Channel is either not from this guild or invalid please try again",  ephemeral: true});
			client.con.query(`UPDATE Settings Set AchannelID = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.reply(`Setting: Announcement Channel Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting announcement channel: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 