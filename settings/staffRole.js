module.exports = {
	name: "Staff Role",
	id: "staffrole",
	sqlvalue: "StaffRoleID",
	description: "The role that can change all settings and use all commands",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set StaffRoleID = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.reply(`Setting: Staff Role Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting staffRole: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 