module.exports = {
	name: "NSFW",
	id: "nsfw",
	sqlvalue: "nsfw",
	description: "Wether or not NSFW marked commands should be enabled or not.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set nsfw = ${args[0]} where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
		}
	}
};