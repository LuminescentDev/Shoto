module.exports = {
	name: "Revive Role",
	id: "reviverole",
	sqlvalue: "ReviveRoleID",
	description: "The role that will be pinged when the revive command is used.",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set ReviveRoleID = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.editReply(`Setting: Revive Role Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting reviveRole: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 