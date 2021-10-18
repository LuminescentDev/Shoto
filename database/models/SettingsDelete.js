module.exports = (client, guildid) => {
	try {
		client.con.query(`DELETE FROM Settings WHERE guildID = ${guildid}`);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		client.channels.cache.get(client.config.errorChannelID).send(`Error deleting guild settings: ${error}`);
	}
};