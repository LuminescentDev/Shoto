module.exports = {
	name: "Snipes",
	id: "snipes",
	sqlvalue: "snipes",
	description: "Weather or not snipes are enabled or disabled",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set snipes = ${args[0]} where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
		}
	}
};