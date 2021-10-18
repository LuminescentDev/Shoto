module.exports = {
	name: "Join Message",
	id: "joinmessage",
	sqlvalue: "joinMessage",
	description: "The message sent when a user joins the server. VARIABLES: {USER MENTION} {USER TAG} {SERVER NAME} {MEMBER COUNT}",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set joinMessage = "${args[0]}" where guildID = "${interaction.guild.id}"`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting joinMessage: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
};