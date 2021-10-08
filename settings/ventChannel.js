module.exports = {
	name: "Vent Channel",
	id: "ventchannel",
	sqlvalue: "ventChannelID",
	description: "The channel that messages from the vent command will be sent to.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set ventChannelID = "${args[0]}" where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
		}
	}
};