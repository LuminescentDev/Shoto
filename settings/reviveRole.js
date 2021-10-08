module.exports = {
	name: "Revive Role",
	id: "reviverole",
	sqlvalue: "ReviveRoleID",
	description: "The role that will be pinged when the revive command is used.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set ReviveRoleID = "${args[0]}" where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
		}
	}
};