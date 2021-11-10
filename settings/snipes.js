module.exports = {
	name: "Snipes",
	id: "snipes",
	sqlvalue: "snipes",
	description: "Weather or not snipes are enabled or disabled",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set snipes = ${args[1]} where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting snipes: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
};