module.exports = {
	name: "Leave Message",
	id: "leavemessage",
	sqlvalue: "leaveMessage",
	description: "The message sent when a user leaves the server. VARIABLES: {USER MENTION} {USER TAG} {SERVER NAME} {MEMBER COUNT}",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set leaveMessage = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.reply(`Setting: Leave Message Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting leaveMessage: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 