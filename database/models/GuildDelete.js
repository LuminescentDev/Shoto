module.exports = (client, guild) => {
	try {
		client.con.query(`DELETE FROM Settings WHERE guildID = ${guild.id}`);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		guild.channels.cache.get(client.config.errorChannelID).send(`Error deleting guild settings: ${error}`);
	}
};