module.exports = (client, guildid) => {
	try {
		client.con.query("INSERT INTO Settings (guildID) VALUES (?)", [guildid]);
	} catch (error) {
		client.users.cache.get(client.config.ownerID[0]).send(`${error}`);
		client.channels.cache.get(client.config.errorChannelID).send(`Error creating guild settings: ${error}`);
	}
};