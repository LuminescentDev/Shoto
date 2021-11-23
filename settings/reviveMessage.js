module.exports = {
	name: "Chat Revive Message",
	id: "revivemessage",
	sqlvalue: "reviveMessage",
	description: "The message sent when a admin uses the chat revive command. VARIABLES: {REVIVE ROLE}",
	execute(client, interaction, args){
		try {
			client.con.query(`UPDATE Settings Set reviveMessage = "${args[1]}" where guildID = "${interaction.guild.id}"`);
			interaction.reply(`Setting: Chat Revive Message Updated to ${args[1]}`);
		} catch (error) {
			client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
			client.channels.cache.get(client.config.errorChannelID).send(`Error when setting reviveMessage: ${error}\n server: ${interaction.guild.id}\n user: ${interaction.member.user.id} ${interaction.member.user.tag}`);
		}
	}
}; 